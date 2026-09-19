import MagicString from 'magic-string'
import type { TransformResult } from '../../types.ts'
import { arkLocalNamesFromSource, jsxBaseNameFromText } from '../../utils/ark-imports.ts'
import type { PropRule, RenameConfig } from './engine.ts'

interface Attr {
  kind: 'attr' | 'expr'
  name?: string
  value?: string
  raw?: string
}

export function makeSvelteRenameTransform(config: RenameConfig) {
  return (source: string, _filePath: string): TransformResult => {
    const arkNames = arkLocalNamesFromSource(source)
    if (arkNames.size === 0) return { code: null, count: 0, skipped: [] }

    const s = new MagicString(source)
    let count = 0
    const skipped: string[] = []

    const tagRe = /<([A-Z][A-Za-z0-9]*(?:\.[A-Za-z0-9]+)+)([^>]*?)(\/?)>/g
    for (const match of source.matchAll(tagRe)) {
      const tag = match[1]
      if (!arkNames.has(jsxBaseNameFromText(tag))) continue

      const rules = config.rules.filter((rule) => matchesPart(tag, rule.component, rule.part))
      if (rules.length === 0) continue

      const attrsStart = match.index + 1 + tag.length
      const attrsEnd = attrsStart + match[2].length
      const attrs = parseAttrs(match[2])

      let changed = 0
      const where = `offset ${match.index} (${tag})`
      for (const rule of rules) changed += applyRule(attrs, rule, where, skipped)
      if (changed === 0) continue

      s.overwrite(attrsStart, attrsEnd, serialize(attrs))
      count += changed
    }

    return { code: count > 0 ? s.toString() : null, count, skipped }
  }
}

function matchesPart(tag: string, component: string, part: string): boolean {
  const segs = tag.split('.')
  if (segs.length !== 2) return false
  return segs[1] === part && segs[0].toLowerCase() === component.toLowerCase()
}

function applyRule(attrs: Attr[], rule: PropRule, where: string, skipped: string[]): number {
  let changed = 0
  const find = (name: string) => attrs.find((a) => a.kind === 'attr' && a.name === name)

  for (const { from, to } of rule.renames ?? []) {
    const attr = find(from)
    if (!attr) continue
    attr.name = to
    changed++
  }

  for (const { from, to } of rule.flips ?? []) {
    const attr = find(from)
    if (!attr) continue
    attr.name = to
    attr.value = invertBoolean(attr.value)
    changed++
  }

  for (const name of rule.removes ?? []) {
    const index = attrs.findIndex((a) => a.kind === 'attr' && a.name === name)
    if (index === -1) continue
    attrs.splice(index, 1)
    changed++
  }

  for (const { name, value } of rule.ensure ?? []) {
    if (find(name)) continue
    attrs.push({ kind: 'attr', name, value })
    changed++
  }

  for (const { name, from, message } of rule.require ?? []) {
    if (find(name)) continue
    const legacy = from ? find(from) : undefined
    if (legacy) {
      legacy.name = name
      changed++
      continue
    }
    skipped.push(`${where}: ${message}`)
  }

  return changed
}

function invertBoolean(value: string | undefined): string {
  if (value === undefined) return '{false}'
  if (value === '{true}' || value === '"true"' || value === "'true'") return '{false}'
  if (value === '{false}' || value === '"false"' || value === "'false'") return '{true}'
  const inner = value.startsWith('{') && value.endsWith('}') ? value.slice(1, -1) : value
  return `{!(${inner})}`
}

function parseAttrs(input: string): Attr[] {
  const attrs: Attr[] = []
  let i = 0
  const isSpace = (c: string) => /\s/.test(c)

  while (i < input.length) {
    while (i < input.length && isSpace(input[i])) i++
    if (i >= input.length) break

    if (input[i] === '{') {
      const end = matchBrace(input, i)
      attrs.push({ kind: 'expr', raw: input.slice(i, end + 1) })
      i = end + 1
      continue
    }

    let n = i
    while (n < input.length && !isSpace(input[n]) && input[n] !== '=' && input[n] !== '/') n++
    const name = input.slice(i, n)
    i = n
    while (i < input.length && isSpace(input[i])) i++

    if (input[i] !== '=') {
      attrs.push({ kind: 'attr', name })
      continue
    }

    i++
    while (i < input.length && isSpace(input[i])) i++
    let value: string
    if (input[i] === '"' || input[i] === "'") {
      const quote = input[i]
      let j = i + 1
      while (j < input.length && input[j] !== quote) j++
      value = input.slice(i, j + 1)
      i = j + 1
    } else if (input[i] === '{') {
      const end = matchBrace(input, i)
      value = input.slice(i, end + 1)
      i = end + 1
    } else {
      let j = i
      while (j < input.length && !isSpace(input[j])) j++
      value = input.slice(i, j)
      i = j
    }
    attrs.push({ kind: 'attr', name, value })
  }

  return attrs
}

function matchBrace(input: string, open: number): number {
  let depth = 0
  for (let i = open; i < input.length; i++) {
    if (input[i] === '{') depth++
    else if (input[i] === '}' && --depth === 0) return i
  }
  return input.length - 1
}

function serialize(attrs: Attr[]): string {
  const parts = attrs.map((attr) => {
    if (attr.kind === 'expr') return attr.raw ?? ''
    return attr.value === undefined ? attr.name : `${attr.name}=${attr.value}`
  })
  return parts.length > 0 ? ` ${parts.join(' ')}` : ''
}
