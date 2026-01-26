'use client'

import { useEffect, useState } from 'react'
import { Box } from 'styled-system/jsx'
import { highlightCode, type SupportedLang } from '~/lib/shiki-client'

interface Props {
  code: string
  lang: SupportedLang
}

const highlightCache = new Map<string, string>()

export const CodeBlock = (props: Props) => {
  const { code, lang } = props
  const cacheKey = `${lang}:${code}`
  const [html, setHtml] = useState<string | null>(() => highlightCache.get(cacheKey) ?? null)

  useEffect(() => {
    if (html) return

    let cancelled = false
    highlightCode(code, lang).then((result) => {
      if (cancelled) return
      highlightCache.set(cacheKey, result)
      setHtml(result)
    })

    return () => {
      cancelled = true
    }
  }, [code, lang, cacheKey, html])

  if (!html) {
    return (
      <Box
        maxH="xl"
        overflow="auto"
        colorScheme="dark"
        data-color-scheme="dark"
        className="scroller"
        css={{
          '& > pre': {
            padding: '4',
          },
        }}
      >
        <pre style={{ padding: 'var(--spacing-4)', margin: 0, color: 'var(--colors-gray-dark-11)' }}>
          <code>{code}</code>
        </pre>
      </Box>
    )
  }

  return (
    <Box
      maxH="xl"
      overflow="auto"
      colorScheme="dark"
      data-color-scheme="dark"
      className="scroller"
      dangerouslySetInnerHTML={{ __html: html }}
      css={{
        '& > pre': {
          padding: '4',
        },
      }}
    />
  )
}
