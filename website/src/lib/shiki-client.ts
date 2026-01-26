'use client'

import { transformerNotationHighlight } from '@shikijs/transformers'
import type { HighlighterCore } from 'shiki/core'

let highlighterPromise: Promise<HighlighterCore> | null = null

export type SupportedLang = 'tsx' | 'vue' | 'svelte' | 'typescript' | 'javascript' | 'bash' | 'json' | 'css'

async function createHighlighter(): Promise<HighlighterCore> {
  const [
    { createHighlighterCore },
    { createJavaScriptRegexEngine },
    theme,
    langTypescript,
    langTsx,
    langVue,
    langSvelte,
    langJson,
    langBash,
    langCss,
  ] = await Promise.all([
    import('shiki/core'),
    import('shiki/engine/javascript'),
    import('@shikijs/themes/github-dark-default'),
    import('@shikijs/langs/typescript'),
    import('@shikijs/langs/tsx'),
    import('@shikijs/langs/vue'),
    import('@shikijs/langs/svelte'),
    import('@shikijs/langs/json'),
    import('@shikijs/langs/bash'),
    import('@shikijs/langs/css'),
  ])

  return createHighlighterCore({
    themes: [theme.default],
    langs: [
      langTypescript.default,
      langTsx.default,
      langVue.default,
      langSvelte.default,
      langJson.default,
      langBash.default,
      langCss.default,
    ],
    engine: createJavaScriptRegexEngine(),
  })
}

export function getClientHighlighter(): Promise<HighlighterCore> {
  if (!highlighterPromise) {
    highlighterPromise = createHighlighter()
  }
  return highlighterPromise
}

export async function highlightCode(code: string, lang: SupportedLang): Promise<string> {
  const highlighter = await getClientHighlighter()
  return highlighter.codeToHtml(code, {
    lang,
    theme: 'github-dark-default',
    transformers: [transformerNotationHighlight()],
  })
}
