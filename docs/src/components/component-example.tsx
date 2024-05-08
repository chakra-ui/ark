import { readFile } from 'node:fs/promises'
import { transformerNotationHighlight } from '@shikijs/transformers'
import { codeToHtml } from 'shiki'
import { CodeExplorer } from './code-explorer'

interface Props {
  /**
   * Identifier of the example to load e.g. `accordion/multiple`
   */
  id: string
}

export const Example = async (props: Props) => {
  const examples = await findExamples(props)

  return <CodeExplorer examples={examples} />
}

const findExamples = async (props: Props) => {
  const [component, id] = props.id.split('/')

  return Promise.all(
    ['react', 'solid', 'vue'].map(async (framework) => {
      const lang = framework === 'vue' ? 'vue' : 'tsx'
      const filename = `${id}.${lang}`
      const path = `../frameworks/${framework}/src/components/${component}/examples/${filename}`
      const content = await readFile(path, 'utf-8').catch(() => 'Example not found')

      const code = content
        .replaceAll(/from '\.\/icons'/g, `from 'lucide-vue-next'`)
        .replaceAll(/from '\..*'/g, `from '@ark-ui/${framework}'`)

      const html = await codeToHtml(code, {
        lang,
        theme: 'github-dark-default',
        transformers: [transformerNotationHighlight()],
      })

      return {
        framework,
        code,
        html,
      }
    }),
  )
}
