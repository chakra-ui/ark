import { readFile } from 'node:fs/promises'
import { join } from 'node:path'
import { transformerNotationHighlight } from '@shikijs/transformers'
import { Match } from 'effect'
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

  return <CodeTabs examples={examples} defaultValue={framework} />
}

const findExamples = async (props: Props) => {
  const id = props.id
  const serverContext = getServerContext()
  const component = props.component ?? serverContext.component

  if (!component) return []

  return Promise.all(
    ['react', 'solid', 'vue'].map(async (framework) => {
      const extenstion = Match.value(framework).pipe(
        Match.when('vue', () => 'vue'),
        Match.orElse(() => 'tsx'),
      )
      const examplePath = Match.value(component).pipe(
        Match.when(
          () => ['progress-circular', 'progress-linear'].includes(component),
          () => `components/progress/examples/${component.split('-')[1]}`,
        ),
        Match.when(
          () => ['environment', 'locale'].includes(component),
          () => `providers/${component}/examples`,
        ),
        Match.orElse(() => `components/${component}/examples`),
      )

      const basePath = `../packages/${framework}/src`
      const fileName = [id, extenstion].join('.')

      const content = await readFile(
        join(process.cwd(), basePath, examplePath, fileName),
        'utf-8',
      ).catch(() => 'Example not found')

      const code = content
        .replaceAll(/from '\.\/icons'/g, `from 'lucide-vue-next'`)
        .replaceAll(/from '\..*'/g, `from '@ark-ui/${framework}'`)
        .replace(/.*@ts-expect-error.*\n/g, '')

      const html = await codeToHtml(code, {
        lang: extenstion,
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
