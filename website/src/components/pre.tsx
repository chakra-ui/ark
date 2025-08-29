import { transformerNotationHighlight } from '@shikijs/transformers'
import type { PropsWithChildren } from 'react'
import { getHighlighter } from '~/lib/highlighter'
import { Box } from 'styled-system/jsx'
import { CodePreview } from './code-preview'

export const Pre = async (props: PropsWithChildren) => {
  // @ts-expect-error it exists
  const lang = props.children?.props.className?.replace('language-', '')
  // @ts-expect-error it exists
  const code = props.children?.props.children.toString()
  const highlighter = await getHighlighter()
  const html = await highlighter.codeToHtml(code, {
    lang,
    theme: 'github-dark-default',
    transformers: [transformerNotationHighlight()],
  })
  return (
    <Box borderWidth="1px" borderColor="gray.dark.4" borderRadius="lg" overflow="hidden">
      <CodePreview html={html} code={code} />
    </Box>
  )
}
