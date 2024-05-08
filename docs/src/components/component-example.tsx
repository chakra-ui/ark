import { readFile } from 'node:fs/promises'
import { transformerNotationHighlight } from '@shikijs/transformers'
import { codeToHtml } from 'shiki'
import { CodeExplorer } from './code-explorer'

interface Props {
  component: string
  id: string
}

export const Example = async (props: Props) => {
  const examples = await findExamples(props)

  return <CodeExplorer examples={examples} />
}

const frameworks = ['react', 'solid', 'vue']

const findExamples = async (props: Props) => {
  const { component, id } = props

  return Promise.all(
    frameworks.map(async (framework) => {
      const lang = framework === 'vue' ? 'vue' : 'tsx'
      const filename = `${id}.${lang}`
      const path = `../frameworks/${framework}/src/components/${component}/examples/${filename}`
      const content = await readFile(path, 'utf-8').catch(() => 'Example not found')

      const html = await codeToHtml(content, {
        lang,
        theme: 'github-dark-default',
        transformers: [transformerNotationHighlight()],
      })

      return {
        framework,
        code: content
          .replaceAll(/from '\.\/icons'/g, `from 'lucide-vue-next'`)
          .replaceAll(/from '\..*'/g, `from '@ark-ui/${framework}'`),
        html,
      }
    }),
  )
}
