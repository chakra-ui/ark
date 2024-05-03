import { transformerNotationHighlight } from '@shikijs/transformers'
import { codeToHtml } from 'shiki'
import { findExample } from '~/lib/examples'

export const Example = async () => {
  const examples = await findExample({ component: 'accordion', id: 'basic' })
  const html = await codeToHtml(examples[0], {
    lang: 'jsx',
    theme: 'ayu-dark',
    transformers: [transformerNotationHighlight()],
  })

  return (
    <div>
      <h1>Story</h1>
      <pre>
        {/* biome-ignore lint/security/noDangerouslySetInnerHtml: All code examples are provided from us */}
        <code dangerouslySetInnerHTML={{ __html: html }} />
      </pre>
    </div>
  )
}
