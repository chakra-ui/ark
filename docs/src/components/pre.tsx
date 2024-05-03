import { transformerNotationHighlight } from '@shikijs/transformers'
import type { PropsWithChildren } from 'react'
import { codeToHtml } from 'shiki'

export const Pre = async (props: PropsWithChildren) => {
  // @ts-expect-error it exists
  const html = await codeToHtml(props.children?.props.children.toString(), {
    lang: 'jsx',
    theme: 'ayu-dark',
    transformers: [transformerNotationHighlight()],
  })
  return (
    <pre>
      {/* biome-ignore lint/security/noDangerouslySetInnerHtml: All code examples are provided from us */}
      <code dangerouslySetInnerHTML={{ __html: html }} />
    </pre>
  )
}
