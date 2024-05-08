import { transformerNotationHighlight } from '@shikijs/transformers'
import type { PropsWithChildren } from 'react'
import { codeToHtml } from 'shiki'
import { Box } from 'styled-system/jsx'
import { CodePreview } from './code-preview'

export const Pre = async (props: PropsWithChildren) => {
  // @ts-expect-error it exists
  const lang = props.children?.props.className?.replace('language-', '')
  // @ts-expect-error it exists
  const code = props.children?.props.children.toString()
  const html = await codeToHtml(code, {
    lang,
    theme: 'github-dark-default',
    transformers: [transformerNotationHighlight()],
  })
  return (
    <Box borderWidth="1px" borderColor="gray.dark.4" borderRadius="xl" overflow="hidden">
      <CodePreview html={html} code={code} />
    </Box>
  )
}
