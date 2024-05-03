import { transformerNotationHighlight } from '@shikijs/transformers'
import type { PropsWithChildren } from 'react'
import { codeToHtml } from 'shiki'

export const Pre = async (props: PropsWithChildren) => {
  // @ts-expect-error it exists
  const html = await codeToHtml(props.children?.props.children.toString(), {
    lang: 'jsx',
    theme: 'aurora-x',
    transformers: [transformerNotationHighlight()],
  })
  return (
    // biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
    <div dangerouslySetInnerHTML={{ __html: html }} />
  )
}
