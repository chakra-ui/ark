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
  const { matchAll = Array.isArray(props.query), query, ignoreCase, text } = props

  if (matchAll) {
    const flags = getRegexFlags(ignoreCase, matchAll)

    const regex = buildRegex(Array.isArray(query) ? query : [query], flags)

    const spans = [...text.matchAll(regex)].map((match) => ({
      start: match.index || 0,
      end: (match.index || 0) + match[0].length,
    }))

    return normalizeSpan(spans, props.text.length).map((chunk) => ({
      text: props.text.slice(chunk.start, chunk.end),
      match: !!chunk.match,
    }))
  }

  if (Array.isArray(query)) {
    throw new Error('matchAll must be true when using multiple queries')
  }

  const searchText = ignoreCase ? text.toLowerCase() : text
  const searchQuery = ignoreCase ? query.toLowerCase() : query

  const start = searchText.indexOf(searchQuery)

  if (start !== -1) {
    const end = start + searchQuery.length
    const spans = [{ start, end }]
    return normalizeSpan(spans, props.text.length).map((chunk) => ({
      text: props.text.slice(chunk.start, chunk.end),
      match: !!chunk.match,
    }))
  }

  return [{ text: props.text, match: false }]
}

export const useHighlight = (props: UseHighlightProps): Accessor<HighlightChunk[]> => {
  return createMemo(() => highlightWords(props))
}
