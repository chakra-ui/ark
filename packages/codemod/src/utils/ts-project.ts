import { existsSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { Project } from 'ts-morph'
import type { SourceFile } from 'ts-morph'

const projectCache = new Map<string, Project>()

function nearestTsConfig(filePath: string): string | undefined {
  let dir = dirname(filePath)
  for (let depth = 0; depth < 30; depth++) {
    const candidate = join(dir, 'tsconfig.json')
    if (existsSync(candidate)) return candidate
    const parent = dirname(dir)
    if (parent === dir) return undefined
    dir = parent
  }
  return undefined
}

export function createTransformSourceFile(filePath: string, source: string, crossFile: boolean): SourceFile {
  const path = /\.(tsx|jsx)$/.test(filePath) ? filePath : `${filePath}.tsx`

  if (!crossFile) {
    const project = new Project({ useInMemoryFileSystem: true, compilerOptions: { jsx: 4 } })
    return project.createSourceFile(path, source)
  }

  const tsConfigFilePath = nearestTsConfig(path)
  const key = tsConfigFilePath ?? '\0default'
  let project = projectCache.get(key)
  if (!project) {
    project = tsConfigFilePath
      ? new Project({ tsConfigFilePath, skipAddingFilesFromTsConfig: true })
      : new Project({ compilerOptions: { jsx: 4, allowJs: true } })
    projectCache.set(key, project)
  }
  return project.createSourceFile(path, source, { overwrite: true })
}
