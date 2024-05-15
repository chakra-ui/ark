import { readFile } from 'node:fs/promises'
import { join } from 'node:path'
import { transformerNotationHighlight } from '@shikijs/transformers'
import { codeToHtml } from 'shiki'
import { getServerContext } from '~/lib/server-context'
import { CodeTabs } from './code-tabs'

interface Props {
  id: string
  component?: string
}

export const Example = async (props: Props) => {
  const framework = getServerContext().framework ?? 'react'
  const examples = await findExamples(props)

  return <CodeTabs examples={examples} defalutValue={framework} />
}

const findExamples = async (props: Props) => {
  const id = props.id
  const serverContext = getServerContext()
  const component = props.component ?? serverContext.component

  return Promise.all(
    ['react', 'solid', 'vue'].map(async (framework) => {
      const lang = framework === 'vue' ? 'vue' : 'tsx'
      const filename = `${id}.${lang}`
      const path = join(
        process.cwd(),
        `../packages/${framework}/src/components/${component}/examples/${filename}`,
      )
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
        label: framework.charAt(0).toUpperCase() + framework.slice(1),
        value: framework,
        code,
        html,
      }
    }),
  )
}
