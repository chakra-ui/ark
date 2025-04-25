import { readFile } from 'node:fs/promises'
import { join } from 'node:path'
import { transformerNotationHighlight } from '@shikijs/transformers'
import { Match } from 'effect'
import { codeToHtml } from 'shiki'
import { getFramework } from '~/lib/frameworks'
import { getServerContext } from '~/lib/server-context'
import { CodeTabs } from './code-tabs'

interface Props {
  id: string
  component?: string
}

export const Example = async (props: Props) => {
  const framework = await getFramework()
  const examples = await findExamples(props)

  return <CodeTabs examples={examples} defaultValue={framework} />
}

export const frameworkExample = async (framework: string, component: string, id: string) => {
  const extension = Match.value(framework).pipe(
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
  const fileName = [id, extension].join('.')

  const content = await readFile(join(process.cwd(), basePath, examplePath, fileName), 'utf-8').catch(
    () => 'Example not found',
  )

  const code = content
    .replaceAll(/from '\.\/icons'/g, `from 'lucide-vue-next'`)
    .replace(/.*@ts-expect-error.*\n/g, '')
    .replace(/@ark-ui\/design-system/g, '@ark-ui/react')
  return { code, extension }
}

const findExamples = async (props: Props) => {
  const id = props.id
  const serverContext = getServerContext()
  const component = props.component ?? serverContext.component

  if (!component) return []

  return Promise.all(
    ['react', 'solid', 'vue'].map(async (framework) => {
      const { code, extension } = await frameworkExample(framework, component, id)

      const html = await codeToHtml(code, {
        lang: extension,
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
