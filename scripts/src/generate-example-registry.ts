import { writeFileSync } from 'node:fs'
import { basename, join } from 'node:path'
import { globby } from 'globby'

const repoRoot = join(import.meta.dirname, '../..')
type RegistryBuild = { imports: string[]; entries: string[] }

/**
 * Convert example file name to PascalCase export name
 * e.g., 'basic.tsx' -> 'Basic', 'root-provider.tsx' -> 'RootProvider'
 */
function toExportName(fileName: string): string {
  return fileName
    .replace(/\.(tsx|ts)$/, '')
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join('')
}

/**
 * Convert file path to a unique import alias
 * e.g., 'menu/examples/basic.tsx' -> 'Menu_Basic'
 */
function toImportAlias(componentName: string, exampleName: string): string {
  const component = componentName
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join('')
  const example = toExportName(exampleName)
  return `${component}_${example}`
}

function toAngularExportName(componentName: string, exampleKey: string): string {
  return `${toExportName(`${componentName}-${exampleKey.replace(/\//g, '-')}.ts`)}Example`
}

export async function buildReactRegistry(repoRoot: string): Promise<RegistryBuild> {
  // Find all example files in React components
  const exampleFiles = await globby(['packages/react/src/components/*/examples/*.tsx'], {
    cwd: repoRoot,
  })

  // Also find nested examples (like progress/examples/circular/*.tsx)
  const nestedExampleFiles = await globby(['packages/react/src/components/*/examples/*/*.tsx'], {
    cwd: repoRoot,
  })

  // Also find provider examples
  const providerExampleFiles = await globby(['packages/react/src/providers/*/examples/*.tsx'], {
    cwd: repoRoot,
  })

  const allFiles = [...exampleFiles, ...nestedExampleFiles, ...providerExampleFiles]

  // Group by component
  const imports: string[] = []
  const registryEntries: string[] = []

  for (const file of allFiles.sort()) {
    // Parse the file path to extract component and example names
    // e.g., 'packages/react/src/components/menu/examples/basic.tsx'
    const parts = file.split('/')
    const exampleFileName = basename(file)

    // Skip template files
    if (exampleFileName.startsWith('_')) continue

    // Handle different path structures
    let componentName: string
    let exampleKey: string

    if (file.includes('/providers/')) {
      // Provider examples: providers/environment/examples/basic.tsx
      const providerIdx = parts.indexOf('providers')
      componentName = parts[providerIdx + 1]
      exampleKey = exampleFileName.replace('.tsx', '')
    } else if (parts.includes('examples') && parts[parts.indexOf('examples') + 1]?.includes('.tsx')) {
      // Standard examples: components/menu/examples/basic.tsx
      const examplesIdx = parts.indexOf('examples')
      componentName = parts[examplesIdx - 1]
      exampleKey = exampleFileName.replace('.tsx', '')
    } else {
      // Nested examples: components/progress/examples/circular/basic.tsx
      const examplesIdx = parts.indexOf('examples')
      componentName = parts[examplesIdx - 1]
      const subFolder = parts[examplesIdx + 1]
      // Use subfolder as part of example key for nested examples
      exampleKey = `${subFolder}/${exampleFileName.replace('.tsx', '')}`
    }

    // Use namespace import to avoid export name guessing
    const importAlias = toImportAlias(
      componentName + (exampleKey.includes('/') ? '-' + exampleKey.split('/')[0] : ''),
      exampleFileName,
    )

    // Use @examples alias configured in next.config.mjs
    // @examples points to packages/react/src/components
    let importPath: string
    if (file.includes('/providers/')) {
      // Provider examples need different path
      const providerIdx = parts.indexOf('providers')
      const rest = parts
        .slice(providerIdx + 1)
        .join('/')
        .replace('.tsx', '')
      importPath = `../../../packages/react/src/providers/${rest}`
    } else {
      // Use @examples alias for component examples
      const componentsIdx = parts.indexOf('components')
      const rest = parts
        .slice(componentsIdx + 1)
        .join('/')
        .replace('.tsx', '')
      importPath = `@examples/${rest}`
    }

    // Use namespace import (import * as X) to get all exports
    imports.push(`import * as ${importAlias} from '${importPath}'`)
    registryEntries.push(`  '${componentName}/${exampleKey}': ${importAlias}`)
  }

  return { imports, entries: registryEntries }
}

export async function buildAngularRegistry(repoRoot: string): Promise<RegistryBuild> {
  const allFiles = await globby(
    ['packages/angular/src/*/examples/**/*.ts', 'packages/angular/src/providers/*/examples/*.ts'],
    {
      cwd: repoRoot,
    },
  )

  const imports: string[] = []
  const registryEntries: string[] = []

  for (const file of allFiles.sort()) {
    const parts = file.split('/')
    const exampleFileName = basename(file)

    if (exampleFileName.startsWith('_') || /\.(spec|test)\.ts$/.test(exampleFileName)) continue

    const examplesIdx = parts.indexOf('examples')
    const componentName = parts.includes('providers') ? parts[parts.indexOf('providers') + 1] : parts[examplesIdx - 1]
    const pathAfterExamples = parts.slice(examplesIdx + 1)
    const exampleKey = pathAfterExamples.join('/').replace(/\.ts$/, '')
    const nestedPath = pathAfterExamples.slice(0, -1).join('-')
    const importAlias = toImportAlias(componentName + (nestedPath ? `-${nestedPath}` : ''), exampleFileName)
    const srcIdx = parts.indexOf('src')
    const rest = parts
      .slice(srcIdx + 1)
      .join('/')
      .replace(/\.ts$/, '')
    const importPath = `../../../packages/angular/src/${rest}`
    const exportName = toAngularExportName(componentName, exampleKey)

    imports.push(`import * as ${importAlias} from '${importPath}'`)
    registryEntries.push(`  '${componentName}/${exampleKey}': { module: ${importAlias}, exportName: '${exportName}' }`)
  }

  return { imports, entries: registryEntries }
}

function buildReactRegistryOutput(imports: string[], registryEntries: string[]): string {
  return `// AUTO-GENERATED FILE - DO NOT EDIT
// Generated by scripts/src/generate-example-registry.ts
// Run: pnpm --filter scripts generate-example-registry

import type { ComponentType } from 'react'

${imports.join('\n')}

// Registry maps example keys to their module namespace
// Each module is imported as a namespace (import * as X) to handle varying export names
type ExampleModule = Record<string, unknown>

const exampleModules: Record<string, ExampleModule> = {
${registryEntries.join(',\n')}
}

/**
 * Get the first component export from a module
 */
function getComponentFromModule(mod: ExampleModule): ComponentType | undefined {
  // Find the first function/component export (skip type exports)
  for (const key of Object.keys(mod)) {
    const value = mod[key]
    if (typeof value === 'function') {
      return value as ComponentType
    }
  }
  return undefined
}

/**
 * Get an example component by component name and example id
 */
export function getExample(component: string, example: string): ComponentType | undefined {
  const mod = exampleModules[\`\${component}/\${example}\`]
  if (!mod) return undefined
  return getComponentFromModule(mod)
}

/**
 * Check if an example exists
 */
export function hasExample(component: string, example: string): boolean {
  return \`\${component}/\${example}\` in exampleModules
}
`
}

function buildAngularRegistryOutput(imports: string[], registryEntries: string[]): string {
  return `// AUTO-GENERATED FILE - DO NOT EDIT
// Generated by scripts/src/generate-example-registry.ts
// Run: pnpm --filter scripts generate-example-registry

${imports.join('\n')}

// Registry maps Angular example keys to their module namespace.
type AngularExampleModule = Record<string, unknown>
type AngularExampleEntry = {
  module: AngularExampleModule
  exportName: string
}

const angularExampleModules: Record<string, AngularExampleEntry> = {
${registryEntries.join(',\n')}
}

/**
 * Get the Angular component export from a module
 */
function getComponentFromModule(entry: AngularExampleEntry): unknown {
  const value = entry.module[entry.exportName]
  return typeof value === 'function' ? value : undefined
}

/**
 * Get an Angular example component by component name and example id
 */
export function getAngularExample(component: string, example: string): unknown {
  const entry = angularExampleModules[\`\${component}/\${example}\`]
  if (!entry) return undefined
  return getComponentFromModule(entry)
}

/**
 * Check if an Angular example exists
 */
export function hasAngularExample(component: string, example: string): boolean {
  return \`\${component}/\${example}\` in angularExampleModules
}
`
}

const main = async () => {
  const reactRegistry = await buildReactRegistry(repoRoot)
  const reactOutput = buildReactRegistryOutput(reactRegistry.imports, reactRegistry.entries)

  // Write to website/src/lib/example-registry.ts
  const reactOutputPath = join(repoRoot, 'website/src/lib/example-registry.ts')
  writeFileSync(reactOutputPath, reactOutput)

  const angularRegistry = await buildAngularRegistry(repoRoot)
  const angularOutput = buildAngularRegistryOutput(angularRegistry.imports, angularRegistry.entries)
  const angularOutputPath = join(repoRoot, 'website/src/lib/angular-example-registry.ts')
  writeFileSync(angularOutputPath, angularOutput)

  console.log(`Generated example registry with ${reactRegistry.entries.length} examples`)
  console.log(`Output: ${reactOutputPath}`)
  console.log(`Generated Angular example registry with ${angularRegistry.entries.length} examples`)
  console.log(`Output: ${angularOutputPath}`)
}

if (import.meta.main) {
  main().catch((err) => {
    console.error(err.message)
    process.exit(1)
  })
}
