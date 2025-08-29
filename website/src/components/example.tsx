import { existsSync } from 'node:fs'
import { readFile } from 'node:fs/promises'
import { join } from 'node:path'
import { transformerNotationHighlight } from '@shikijs/transformers'
import { Match } from 'effect'
import { getHighlighter } from '~/lib/highlighter'
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
  const styles = await fetchStyle(props.component)

  return (
    <CodeTabs
      examples={examples}
      defaultValue={framework}
      styles={styles}
      meta={{
        ...props,
        framework,
      }}
    />
  )
}

export const frameworkExample = async (framework: string, component: string, id: string) => {
  const extension = Match.value(framework).pipe(
    Match.when('vue', () => 'vue'),
    Match.when('svelte', () => 'svelte'),
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

  const srcPath = Match.value(framework).pipe(
    Match.when('svelte', () => 'src/lib'),
    Match.orElse(() => 'src'),
  )
  const basePath = `../packages/${framework}/${srcPath}`
  const fileName = [id, extension].join('.')

  const content = await readFile(join(process.cwd(), basePath, examplePath, fileName), 'utf-8').catch(
    () => 'Example not found',
  )

  const code = content.replaceAll(/from '\.\/icons'/g, `from 'lucide-vue-next'`).replace(/.*@ts-expect-error.*\n/g, '')
  return { code, extension }
}

const frameworks = ['react', 'solid', 'vue', 'svelte']

const findExamples = async (props: Props) => {
  const id = props.id
  const serverContext = getServerContext()
  const component = props.component ?? serverContext.component
  const highlighter = await getHighlighter()

  if (!component) return []

  return Promise.all(
    frameworks.map(async (framework) => {
      const { code, extension } = await frameworkExample(framework, component, id)

      const html = highlighter.codeToHtml(code, {
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

const replacementMap = {
  'progress-circular': 'progress',
  'progress-linear': 'progress',
}

export const fetchStyle = async (comp: string | undefined) => {
  const serverContext = getServerContext()

  const component = comp ?? serverContext.component
  if (!component) return ''
  const cm = replacementMap[component as keyof typeof replacementMap] ?? component
  const filePath = join(process.cwd(), '..', '.storybook', 'styles', `${cm}.css`)
  if (existsSync(filePath)) {
    return readFile(filePath, 'utf-8')
  }
  return ''
}
