import { Highlighter, Lang } from 'shiki'

let highlighter: Highlighter

export const highlightCode = async (code: string, lang: Lang = 'tsx') => {
  if (!highlighter) {
    const { getHighlighter } = await import('shiki')
    highlighter = await getHighlighter({ theme: 'css-variables' })
  }
  return highlighter.codeToHtml(code, { lang })
}
