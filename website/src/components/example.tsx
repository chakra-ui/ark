import { existsSync } from 'node:fs'
import { readFile } from 'node:fs/promises'
import { join } from 'node:path'
import { Match } from 'effect'
import { css, cx } from 'styled-system/css'
import { Stack } from 'styled-system/jsx'
import type { SupportedLang } from '~/lib/shiki-client'
import { getFramework } from '~/lib/frameworks'
import { getServerContext } from '~/lib/server-context'
import { CollapsibleCode } from './collapsible-code'
import { ExampleCodeTabs } from './example-code'
import { ExamplePreview } from './example-preview'

interface Props {
  id: string
  component?: string
}

export const Example = async (props: Props) => {
  const serverContext = getServerContext()
  const component = props.component ?? serverContext.component

  const framework = await getFramework()
  const { code, lang } = await fetchFrameworkCode(framework, component, props.id)
  const cssModules = await fetchCssModulesFromCode(code)
  const hasPreview = component ? exampleExists(component, props.id) : false

  return (
    <Stack gap="0" className={cx('not-prose', css({ '& > .example-preview-scope': { borderBottomRadius: '0' } }))}>
      {hasPreview && component && <ExamplePreview component={component} example={props.id} />}
      <CollapsibleCode>
        <ExampleCodeTabs
          code={code}
          lang={lang}
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
  const serverContext = getServerContext()
  const component = props.component ?? serverContext.component

  const framework = await getFramework()
  const { code, lang } = await fetchFrameworkCode(framework, component, props.id)
  const cssModules = await fetchCssModulesFromCode(code)

  return (
    <ExampleCodeTabs
      code={code}
      lang={lang}
      cssModules={cssModules}
      meta={{
        ...props,
        framework,
      }}
    />
  )
}

const getExamplePath = (component: string) =>
  Match.value(component).pipe(
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

const getExtension = (framework: string) =>
  Match.value(framework).pipe(
    Match.when('vue', () => 'vue'),
    Match.when('svelte', () => 'svelte'),
    Match.orElse(() => 'tsx'),
  )

const getSrcPath = (framework: string) =>
  Match.value(framework).pipe(
    Match.when('svelte', () => 'src/lib'),
    Match.orElse(() => 'src'),
  )

export const frameworkExample = async (
  framework: string,
  component: string,
  id: string,
): Promise<{ code: string; extension: string }> => {
  const extension = getExtension(framework)
  const examplePath = getExamplePath(component)
  const srcPath = getSrcPath(framework)

  const basePath = `../packages/${framework}/${srcPath}`
  const fileName = [id, extension].join('.')

  const content = await readFile(join(process.cwd(), basePath, examplePath, fileName), 'utf-8').catch(
    () => 'Example not found',
  )

  const code = content.replaceAll(/from '\.\/icons'/g, `from 'lucide-vue-next'`).replace(/.*@ts-expect-error.*\n/g, '')
  return { code, extension }
}

const fetchFrameworkCode = async (
  framework: string,
  component: string | undefined,
  id: string,
): Promise<{ code: string; lang: SupportedLang }> => {
  if (!component) return { code: 'Example not found', lang: 'tsx' }

  const { code, extension } = await frameworkExample(framework, component, id)
  return { code, lang: extension as SupportedLang }
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
 * Fetch CSS modules used by an example (single code string)
 */
const fetchCssModulesFromCode = async (code: string): Promise<Record<string, string>> => {
  const cssModules: Record<string, string> = {}
  const modulesPath = join(process.cwd(), '..', '.storybook', 'modules')

  // Extract CSS module imports from code
  const imports = extractCssModuleImports(code)

  // Load each CSS module
  for (const moduleName of imports) {
    const filePath = join(modulesPath, moduleName)
    if (existsSync(filePath)) {
      cssModules[moduleName] = await readFile(filePath, 'utf-8')
    }
  }

  // Always include base styles (theme + global + utilities)
  const themeFile = join(modulesPath, 'theme.css')
  const globalFile = join(modulesPath, 'global.css')
  const utilitiesFile = join(modulesPath, 'utilities.css')

  if (existsSync(themeFile)) {
    cssModules['theme.css'] = await readFile(themeFile, 'utf-8')
  }
  if (existsSync(globalFile)) {
    // Strip the @import line since utilities is loaded separately
    const globalContent = await readFile(globalFile, 'utf-8')
    cssModules['global.css'] = globalContent.replace(/@import\s+['"]\.\/utilities\.css['"];?\s*/g, '')
  }
  if (existsSync(utilitiesFile)) {
    cssModules['utilities.css'] = await readFile(utilitiesFile, 'utf-8')
  }

  return cssModules
}
