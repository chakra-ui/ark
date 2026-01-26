import { Box } from 'styled-system/jsx'
import type { SupportedLang } from '~/lib/shiki-client'
import { CodeBlock } from './code-block'
import { CopyToClipboardButton } from './copy-to-clipboard-button'

interface Props {
  code: string
  lang?: SupportedLang
  html?: string
}

export const CodePreview = (props: Props) => {
  const { html, code, lang, ...rest } = props
  return (
    <Box bg="gray.dark.2" position="relative" className="not-prose" {...rest}>
      <Box position="absolute" top="2" right="3" className="dark" zIndex="1">
        <CopyToClipboardButton content={code} />
      </Box>
      {html ? (
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
      ) : (
        <CodeBlock code={code} lang={lang ?? 'tsx'} />
      )}
    </Box>
  )
}
