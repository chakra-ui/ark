import { readFile, readdir } from 'node:fs/promises'
import { join } from 'node:path'
import { Project } from 'ts-morph'
import { getExampleDir, getExamplePath, getExampleRelPath, getFrameworkExtension, getSrcPath } from './example-paths'
import { frameworks } from './frameworks'

export { getExamplePath, getExampleDir, getExampleRelPath, getFrameworkExtension, getSrcPath }

export const SUPPORTED_FRAMEWORKS = frameworks

export type Framework = (typeof SUPPORTED_FRAMEWORKS)[number]

export const validateFramework = (framework: string): framework is Framework => {
  return SUPPORTED_FRAMEWORKS.includes(framework as Framework)
}

export const getPackageBasePath = (framework: string) => {
  const srcPath = getSrcPath(framework)
  return join(process.cwd(), `../packages/${framework}/${srcPath}`)
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

export const cleanCode = (content: string): string => {
  return content
    .replaceAll(/from '\.\/icons'/g, `from 'lucide-vue-next'`)
    .replaceAll(/from 'styles\//g, `from './`)
    .replace(/.*@ts-expect-error.*\n/g, '')
}

export const getAllComponents = async (framework: string): Promise<string[]> => {
  const basePath = getPackageBasePath(framework)
  const components = new Set<string>()

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
  const fullPath = getExampleDir(framework, component)

  try {
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
  const extension = getFrameworkExtension(framework)
  const fullPath = join(getExampleDir(framework, component), `${exampleId}.${extension}`)

  return await readFile(fullPath, 'utf-8')
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
