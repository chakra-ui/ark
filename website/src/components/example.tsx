import { existsSync } from 'node:fs'
import { readFile } from 'node:fs/promises'
import { join } from 'node:path'
import { css, cx } from 'styled-system/css'
import { Stack } from 'styled-system/jsx'
import type { SupportedLang } from '~/lib/shiki-client'
import { cleanExampleCode, getFrameworkExampleFilePath, getFrameworkExtension } from '~/lib/framework-example-paths'
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
  const { code, lang, framework: resolvedFramework } = await fetchFrameworkCode(framework, component, props.id)
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
            id: props.id,
            component,
            framework: resolvedFramework,
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
  const { code, lang, framework: resolvedFramework } = await fetchFrameworkCode(framework, component, props.id)
  const cssModules = await fetchCssModulesFromCode(code)

  return (
    <ExampleCodeTabs
      code={code}
      lang={lang}
      cssModules={cssModules}
      meta={{
        id: props.id,
        component,
        framework: resolvedFramework,
      }}
    />
  )
}

export const frameworkExample = async (
  framework: string,
  component: string,
  id: string,
): Promise<{ code: string; extension: string; framework: string }> => {
  const extension = getFrameworkExtension(framework)
  const filePath = getFrameworkExampleFilePath(framework, component, id)

  let content = await readFile(filePath, 'utf-8').catch(() => undefined)
  let resolvedFramework = framework
  let resolvedExtension = extension

  if (content === undefined && framework !== 'react') {
    resolvedFramework = 'react'
    resolvedExtension = getFrameworkExtension(resolvedFramework)
    const fallbackPath = getFrameworkExampleFilePath(resolvedFramework, component, id)
    content = await readFile(fallbackPath, 'utf-8').catch(() => undefined)
  }

  const code = cleanExampleCode(resolvedFramework, content ?? 'Example not found')
  return { code, extension: resolvedExtension, framework: resolvedFramework }
}

const fetchFrameworkCode = async (
  framework: string,
  component: string | undefined,
  id: string,
): Promise<{ code: string; lang: SupportedLang; framework: string }> => {
  if (!component) return { code: 'Example not found', lang: 'tsx', framework }

  const { code, extension, framework: resolvedFramework } = await frameworkExample(framework, component, id)
  return { code, lang: extension as SupportedLang, framework: resolvedFramework }
}

/**
 * Check if a React example file exists (server-side only)
 */
function exampleExists(component: string, id: string): boolean {
  const filePath = getFrameworkExampleFilePath('react', component, id)
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
