import { existsSync } from 'node:fs'
import { readFile } from 'node:fs/promises'
import { join } from 'node:path'
import { transformerNotationHighlight } from '@shikijs/transformers'
import { Match } from 'effect'
import { css, cx } from 'styled-system/css'
import { Stack } from 'styled-system/jsx'
import { getHighlighter } from '~/lib/highlighter'
import { getFramework } from '~/lib/frameworks'
import { getServerContext } from '~/lib/server-context'
import { CodeTabs } from './code-tabs'
import { CollapsibleCode } from './collapsible-code'
import { ExamplePreview } from './example-preview'

interface Props {
  id: string
  component?: string
}

export const Example = async (props: Props) => {
  const serverContext = getServerContext()
  const component = props.component ?? serverContext.component

  const framework = await getFramework()
  const examples = await findExamples(props)
  const cssModules = await fetchCssModules(examples)
  const hasPreview = component ? exampleExists(component, props.id) : false

  return (
    <Stack gap="0" className={cx('not-prose', css({ '& > .example-preview-scope': { borderBottomRadius: '0' } }))}>
      {hasPreview && component && <ExamplePreview component={component} example={props.id} />}
      <CollapsibleCode>
        <CodeTabs
          examples={examples}
          defaultValue={framework}
          cssModules={cssModules}
          meta={{
            ...props,
            framework,
          }}
        />
      </CollapsibleCode>
    </Stack>
  )
}

export const ExampleCode = async (props: Props) => {
  const framework = await getFramework()
  const examples = await findExamples(props)
  const cssModules = await fetchCssModules(examples)

  return (
    <CodeTabs
      examples={examples}
      defaultValue={framework}
      cssModules={cssModules}
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

/**
 * Check if a React example file exists (server-side only)
 */
function exampleExists(component: string, id: string): boolean {
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

  const filePath = join(process.cwd(), '..', 'packages', 'react', 'src', examplePath, `${id}.tsx`)
  return existsSync(filePath)
}

/**
 * Extract CSS module import paths from example code
 */
function extractCssModuleImports(code: string): string[] {
  const importRegex = /from\s+['"]styles\/([^'"]+\.module\.css)['"]/g
  const matches = code.matchAll(importRegex)
  const imports = Array.from(matches, (match) => match[1])
  return [...new Set(imports)]
}

/**
 * Fetch CSS modules used by an example
 */
export const fetchCssModules = async (exampleCodes: { code: string }[]): Promise<Record<string, string>> => {
  const cssModules: Record<string, string> = {}
  const modulesPath = join(process.cwd(), '..', '.storybook', 'modules')

  // Collect all unique CSS module imports from all framework examples
  const allImports = new Set<string>()
  for (const { code } of exampleCodes) {
    for (const imp of extractCssModuleImports(code)) {
      allImports.add(imp)
    }
  }

  // Load each CSS module
  for (const moduleName of allImports) {
    const filePath = join(modulesPath, moduleName)
    if (existsSync(filePath)) {
      cssModules[moduleName] = await readFile(filePath, 'utf-8')
    }
  }

  // Always include base styles (theme + utilities)
  const themeFile = join(modulesPath, 'theme.css')
  const utilitiesFile = join(modulesPath, 'utilities.css')

  if (existsSync(themeFile)) {
    cssModules['theme.css'] = await readFile(themeFile, 'utf-8')
  }
  if (existsSync(utilitiesFile)) {
    cssModules['utilities.css'] = await readFile(utilitiesFile, 'utf-8')
  }

  return cssModules
}

export const fetchStyle = async (comp: string | undefined) => {
  const serverContext = getServerContext()
  const component = comp ?? serverContext.component
  if (!component) return ''

  // This is a legacy function kept for backward compatibility
  // Use fetchCssModules for the new CSS module approach
  return ''
}
