import { transformerNotationHighlight } from '@shikijs/transformers'
import { codeToHtml } from 'shiki'
import { findExample } from '~/lib/examples'

export const ComponentPreview = async () => {
  const examples = await findExample({ component: 'accordion', id: 'basic' })
  const html = await codeToHtml(examples[0], {
    lang: 'jsx',
    theme: 'github-dark',
    transformers: [transformerNotationHighlight()],
  })

  // biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
  return <div dangerouslySetInnerHTML={{ __html: html }} />
}
