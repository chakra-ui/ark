import type { JSX } from 'solid-js'

type StyleObject = JSX.CSSProperties
type StyleString = string

type Style = StyleObject | StyleString

export const mergeStyle = (a: Style, b: Style): StyleString =>
  styleObjectToString({ ...getStyleObject(a), ...getStyleObject(b) })

const getStyleObject = (style: Style): StyleObject =>
  typeof style === 'object' ? style : stringStyleToObject(style)

const stringStyleToObject = (style: StyleString): StyleObject => {
  const object: Record<string, string> = {}
  const extractCSSregex = /([^:; ]*):\s*([^;]*)/g
  let match: RegExpExecArray | null
  while ((match = extractCSSregex.exec(style))) {
    object[match[1]] = match[2]
  }
  return object
}

const styleObjectToString = (value: StyleObject): StyleString => {
  if (!value) return ''
  if (typeof value === 'string') return value
  let result = ''
  const k = Object.keys(value)
  for (let i = 0; i < k.length; i++) {
    const s = k[i]
    // @ts-expect-error - we know this is a string
    const v = value[s]
    if (v != undefined) {
      if (i) result += ';'
      result += `${s}:${v}`
    }
  }
  return result
}
