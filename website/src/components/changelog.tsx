import { transformerNotationDiff, transformerNotationHighlight } from '@shikijs/transformers'
import { Marked, type Token } from 'marked'
import type { ReactNode } from 'react'
import { createElement } from 'react'
import { Box } from 'styled-system/jsx'
import { prose } from 'styled-system/recipes'
import { getHighlighter } from '~/lib/highlighter'
import { CodePreview } from './code-preview'

interface TocEntry {
  title: string
  url: string
  items: never[]
}

const KNOWN_LANGS = new Set([
  'tsx',
  'vue',
  'bash',
  'sh',
  'shell',
  'zsh',
  'javascript',
  'js',
  'typescript',
  'ts',
  'json',
  'svelte',
  'diff',
  'css',
])

const slugify = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')

export async function renderChangelog(markdown: string): Promise<{ body: ReactNode; toc: TocEntry[] }> {
  const marked = new Marked()
  const tokens = marked.lexer(markdown)
  const links = (tokens as Token[] & { links?: unknown }).links
  const highlighter = await getHighlighter()
  const toc: TocEntry[] = []
  const seen = new Map<string, number>()

  const parseBlock = (token: Token) => {
    const one = [token] as Token[] & { links?: unknown }
    one.links = links
    return marked.parser(one)
  }

  const nodes = tokens.map((token, index) => {
    if (token.type === 'code') {
      const lang = KNOWN_LANGS.has(token.lang ?? '') ? (token.lang as string) : 'plaintext'
      const html = highlighter.codeToHtml(token.text, {
        lang,
        theme: 'github-dark-default',
        transformers: [transformerNotationDiff(), transformerNotationHighlight()],
      })
      return (
        <Box key={index} my="6" borderWidth="1px" borderColor="gray.dark.4" borderRadius="lg" overflow="hidden">
          <CodePreview html={html} code={token.text} />
        </Box>
      )
    }

    if (token.type === 'heading') {
      if (token.depth === 1) return null
      const label = token.text.replace(/[[\]]/g, '')
      const base = slugify(label)
      const count = seen.get(base) ?? 0
      seen.set(base, count + 1)
      const id = count ? `${base}-${count}` : base
      if (token.depth === 2) toc.push({ title: label, url: `#${id}`, items: [] })
      return createElement(`h${token.depth}`, {
        key: index,
        id,
        dangerouslySetInnerHTML: { __html: marked.parseInline(token.text) as string },
      })
    }

    return <div key={index} dangerouslySetInnerHTML={{ __html: parseBlock(token) }} />
  })

  return { body: <div className={prose()}>{nodes}</div>, toc }
}
