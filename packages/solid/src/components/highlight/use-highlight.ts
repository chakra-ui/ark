import type { Accessor } from 'solid-js'
import { createMemo } from 'solid-js'

export interface RegexOptions {
  /**
   * Whether to ignore case while matching
   */
  ignoreCase?: boolean
  /**
   * Whether to match multiple instances of the query
   */
  matchAll?: boolean
}

export interface UseHighlightProps extends RegexOptions {
  /**
   * The text to highlight
   */
  text: string
  /**
   * The query to highlight in the text
   */
  query: string | string[]
}

export interface HighlightChunk {
  text: string
  match: boolean
}

export interface HighlightSpan {
  start: number
  end: number
  match?: boolean
}

const escapeRegexp = (term: string): string =>
  term.replace(/[|\\{}()[\]^$+*?.-]/g, (char: string) => `\\${char}`)

const buildRegex = (queryProp: string[], flags: string): RegExp => {
  const query = queryProp.filter(Boolean).map((text) => escapeRegexp(text))
  return new RegExp(`(${query.join('|')})`, flags)
}

const getRegexFlags = (ignoreCase = true, matchAll = true): string =>
  `${ignoreCase ? 'i' : ''}${matchAll ? 'g' : ''}`

const normalizeSpan = (spans: HighlightSpan[], len: number) => {
  const result: HighlightSpan[] = []
  const append = (start: number, end: number, match: boolean) => {
    if (end - start > 0) result.push({ start, end, match })
  }

  if (spans.length === 0) {
    append(0, len, false)
  } else {
    let lastIndex = 0
    for (const chunk of spans) {
      append(lastIndex, chunk.start, false)
      append(chunk.start, chunk.end, true)
      lastIndex = chunk.end
    }

    append(lastIndex, len, false)
  }

  return result
}

const highlightWords = (props: UseHighlightProps): HighlightChunk[] => {
  const flags = getRegexFlags(props.ignoreCase, props.matchAll)

  const regex = buildRegex(Array.isArray(props.query) ? props.query : [props.query], flags)

  const spans = [...props.text.matchAll(regex)].map((match) => ({
    start: match.index || 0,
    end: (match.index || 0) + match[0].length,
  }))

  return normalizeSpan(spans, props.text.length).map((chunk) => ({
    text: props.text.slice(chunk.start, chunk.end),
    match: !!chunk.match,
  }))
}

export const useHighlight = (props: UseHighlightProps): Accessor<HighlightChunk[]> => {
  return createMemo(() => highlightWords(props))
}
