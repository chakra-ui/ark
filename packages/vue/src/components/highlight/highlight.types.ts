export interface UseHighlightProps {
  /**
   * The text to highlight
   */
  text: string
  /**
   * The query to highlight in the text
   */
  query: string | string[]
  /**
   * Whether to ignore case while matching
   */
  ignoreCase?: boolean
  /**
   * Whether to match multiple instances of the query
   */
  matchAll?: boolean
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
