import { readFile, readdir } from 'node:fs/promises'
import { join } from 'node:path'
import { Project } from 'ts-morph'
import {
  cleanExampleCode,
  getFrameworkExampleDir,
  getFrameworkExampleDisplayPath,
  getFrameworkExampleFilePath,
  getFrameworkExtension,
  getPackageBasePath,
  getSrcPath,
} from './framework-example-paths'

export { getFrameworkExampleDisplayPath, getFrameworkExtension, getPackageBasePath, getSrcPath }

export const SUPPORTED_FRAMEWORKS = ['react', 'solid', 'vue', 'svelte', 'angular'] as const

export type Framework = (typeof SUPPORTED_FRAMEWORKS)[number]

export const validateFramework = (framework: string): framework is Framework => {
  return SUPPORTED_FRAMEWORKS.includes(framework as Framework)
}

export const extractNpmDependencies = (code: string): string[] => {
  const project = new Project({ useInMemoryFileSystem: true })
  const sourceFile = project.createSourceFile('temp.ts', code)

  const dependencies = new Set<string>()

  for (const importDecl of sourceFile.getImportDeclarations()) {
    const moduleSpecifier = importDecl.getModuleSpecifierValue()
    if (moduleSpecifier && !moduleSpecifier.startsWith('.') && !moduleSpecifier.startsWith('/')) {
      // Extract base package name
      const parts = moduleSpecifier.split('/')
      if (moduleSpecifier.startsWith('@')) {
        // Scoped package: @scope/package
        dependencies.add(parts.slice(0, 2).join('/'))
      } else {
        // Regular package
        dependencies.add(parts[0])
      }
    }
  }

  return Array.from(dependencies)
}

export const cleanCode = (framework: string, content: string): string => {
  return cleanExampleCode(framework, content).replaceAll(/from 'styles\//g, `from './`)
}

export const getAllComponents = async (framework: string): Promise<string[]> => {
  const basePath = getPackageBasePath(framework)
  const components = new Set<string>()

  if (framework === 'angular') {
    try {
      const componentDirs = await readdir(basePath, { withFileTypes: true })
      for (const dir of componentDirs) {
        if (!dir.isDirectory()) continue
        if (dir.name === 'src') continue
        try {
          await readdir(join(basePath, dir.name, 'examples'))
          components.add(dir.name)
        } catch {
          // No examples directory, skip
        }
      }
    } catch {
      return []
    }
    // Batch 2 components live under packages/angular/src/<component>. Only treat a nested
    // directory as a component when it has an examples/ subdirectory.
    try {
      const nestedDirs = await readdir(join(basePath, 'src'), { withFileTypes: true })
      for (const dir of nestedDirs) {
        if (!dir.isDirectory()) continue
        try {
          await readdir(join(basePath, 'src', dir.name, 'examples'))
          components.add(dir.name)
        } catch {
          // No examples directory, skip
        }
      }
    } catch {
      // No nested src directory
    }
    return Array.from(components).sort()
  }

  try {
    // Check components directory
    const componentsPath = join(basePath, 'components')
    const componentDirs = await readdir(componentsPath, { withFileTypes: true })

    for (const dir of componentDirs) {
      if (dir.isDirectory()) {
        const examplesPath = join(componentsPath, dir.name, 'examples')
        try {
          await readdir(examplesPath)
          components.add(dir.name)
        } catch {
          // No examples directory, skip
        }

        // Check for nested progress examples
        if (dir.name === 'progress') {
          const progressExamplesPath = join(componentsPath, dir.name, 'examples')
          try {
            const progressDirs = await readdir(progressExamplesPath, { withFileTypes: true })
            for (const progressDir of progressDirs) {
              if (progressDir.isDirectory()) {
                components.add(`progress-${progressDir.name}`)
              }
            }
          } catch {
            // No nested examples
          }
        }
      }
    }

    // Check providers directory
    const providersPath = join(basePath, 'providers')
    try {
      const providerDirs = await readdir(providersPath, { withFileTypes: true })
      for (const dir of providerDirs) {
        if (dir.isDirectory()) {
          const examplesPath = join(providersPath, dir.name, 'examples')
          try {
            await readdir(examplesPath)
            components.add(dir.name)
          } catch {
            // No examples directory, skip
          }
        }
      }
    } catch {
      // No providers directory
    }
  } catch (error) {
    console.error('Error reading components:', error)
  }

  return Array.from(components).sort()
}

export const getComponentExamples = async (framework: string, component: string): Promise<string[]> => {
  const extension = getFrameworkExtension(framework)

  try {
    const fullPath = getFrameworkExampleDir(framework, component)
    const files = await readdir(fullPath)
    return files
      .filter((file) => file.endsWith(`.${extension}`))
      .map((file) => file.replace(`.${extension}`, ''))
      .sort()
  } catch {
    return []
  }
}

export const readExampleFile = async (framework: string, component: string, exampleId: string): Promise<string> => {
  return await readFile(getFrameworkExampleFilePath(framework, component, exampleId), 'utf-8')
}

const STYLE_IMPORT_RE = /from '\.\/([\w-]+\.module\.css)'/g

export const extractStyleImports = (code: string): string[] => {
  const matches = code.matchAll(STYLE_IMPORT_RE)
  return [...new Set(Array.from(matches, (m) => m[1]))]
}

export const getStylesBasePath = () => {
  return join(process.cwd(), '../.storybook/modules')
}

export const readStyleFile = async (fileName: string): Promise<string | null> => {
  try {
    return await readFile(join(getStylesBasePath(), fileName), 'utf-8')
  } catch {
    return null
  }
}

export const createExampleResponse = async (exampleId: string, framework: string, component: string, code: string) => {
  const extension = getFrameworkExtension(framework)
  const fileName = `${exampleId}.${extension}`
  const npmDependencies = extractNpmDependencies(code)

  const files: { name: string; content: string; npmDependencies?: string[] }[] = [
    { name: fileName, content: code, npmDependencies },
  ]

  const styleFileNames = extractStyleImports(code)
  for (const styleFileName of styleFileNames) {
    const content = await readStyleFile(styleFileName)
    if (content) {
      files.push({ name: styleFileName, content })
    }
  }

  return {
    id: exampleId,
    framework,
    component,
    files,
  }
}
