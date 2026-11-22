import { existsSync } from 'node:fs'
import { readFile } from 'node:fs/promises'
import { extname, join } from 'node:path'
import { cache } from 'react'
import { css, cx } from 'styled-system/css'
import { Stack } from 'styled-system/jsx'
import type { SupportedLang } from '~/lib/shiki-client'
import { getExampleDir, getFrameworkExtension } from '~/lib/example-paths'
import { type Framework, defaultFramework, frameworkLabels } from '~/lib/frameworks'
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

  const framework = serverContext.framework ?? defaultFramework
  const { code, lang, localFiles, found } = await fetchFrameworkCode(framework, component, props.id)
  if (!found) return <ExampleUnavailable framework={framework} />
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
          localFiles={localFiles}
          meta={{
            id: props.id,
            component,
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

  const framework = serverContext.framework ?? defaultFramework
  const { code, lang, localFiles, found } = await fetchFrameworkCode(framework, component, props.id)
  if (!found) return <ExampleUnavailable framework={framework} />
  const cssModules = await fetchCssModulesFromCode(code)

  return (
    <ExampleCodeTabs
      code={code}
      lang={lang}
      cssModules={cssModules}
      localFiles={localFiles}
      meta={{
        id: props.id,
        component,
        framework,
      }}
    />
  )
}

const ExampleUnavailable = (props: { framework: Framework }) => (
  <p
    className={cx(
      'not-prose',
      css({ borderWidth: '1px', borderRadius: 'lg', px: '4', py: '3', textStyle: 'sm', color: 'fg.muted' }),
    )}
  >
    This example isn't available for {frameworkLabels[props.framework]} yet.
  </p>
)

const cleanExampleCode = (content: string) =>
  content.replaceAll(/from '\.\/icons'/g, `from 'lucide-vue-next'`).replace(/.*@ts-expect-error.*\n/g, '')

const toLang = (extension: string): SupportedLang => (extension === 'ts' ? 'typescript' : (extension as SupportedLang))

const LOCAL_IMPORT_RE = /from\s+['"](\.\/[\w./-]+)['"]/g

/**
 * Examples that need a wrapper (a provider around the demo, say) import a sibling file.
 * Showing only the entry file would hide the part that matters, so follow those imports
 * and return each one to render as its own tab.
 */
const readLocalFiles = async (framework: string, component: string, entryCode: string) => {
  const dir = getExampleDir(framework, component)
  const files: Record<string, string> = {}

  const visit = async (code: string, depth: number) => {
    if (depth > 3) return

    for (const [, specifier] of code.matchAll(LOCAL_IMPORT_RE)) {
      const request = specifier.slice(2)
      if (request.endsWith('.css') || request.endsWith('.json')) continue

      const candidates = extname(request) ? [request] : [`${request}.tsx`, `${request}.ts`]
      const name = candidates.find((candidate) => existsSync(join(dir, candidate)))
      if (!name || files[name]) continue

      const content = await readFile(join(dir, name), 'utf-8')
      files[name] = cleanExampleCode(content)
      await visit(content, depth + 1)
    }
  }

  await visit(entryCode, 0)
  return files
}

export const frameworkExample = async (
  framework: string,
  component: string,
  id: string,
): Promise<{ code: string; extension: string; found: boolean }> => {
  const extension = getFrameworkExtension(framework)
  const content = await readFile(join(getExampleDir(framework, component), `${id}.${extension}`), 'utf-8').catch(
    () => null,
  )

  if (content === null) return { code: 'Example not found', extension, found: false }
  return { code: cleanExampleCode(content), extension, found: true }
}

const fetchFrameworkCode = async (
  framework: string,
  component: string | undefined,
  id: string,
): Promise<{ code: string; lang: SupportedLang; localFiles: Record<string, string>; found: boolean }> => {
  if (!component) return { code: 'Example not found', lang: 'tsx', localFiles: {}, found: false }

  const { code, extension, found } = await frameworkExample(framework, component, id)
  const localFiles = found ? await readLocalFiles(framework, component, code) : {}
  return { code, lang: toLang(extension), localFiles, found }
}

/**
 * Check if a React example file exists (server-side only)
 */
function exampleExists(component: string, id: string): boolean {
  return existsSync(join(getExampleDir('react', component), `${id}.tsx`))
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
const fetchCssModulesFromCode = (code: string) => loadCssModules(extractCssModuleImports(code).sort().join(','))

const loadCssModules = cache(async (key: string): Promise<Record<string, string>> => {
  const cssModules: Record<string, string> = {}
  const modulesPath = join(process.cwd(), '..', '.storybook', 'modules')
  const imports = key ? key.split(',') : []

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
})
