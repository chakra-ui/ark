import { readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'

export interface PropDefinition {
  type: string
  isRequired: boolean
  defaultValue?: string
  description?: string
}

export interface TypePart {
  props: Record<string, PropDefinition>
  element?: string
  tag?: string
  emits?: Record<string, PropDefinition>
}

export interface ComponentTypes {
  parts: Record<string, TypePart>
  component: string
  framework: string
}

export type Types = ComponentTypes

const TYPES_DIR = join(process.cwd(), 'src/content/types')

const load = (): ComponentTypes[] => {
  const out: ComponentTypes[] = []
  let frameworks: string[]
  try {
    frameworks = readdirSync(TYPES_DIR)
  } catch {
    return out
  }
  for (const framework of frameworks) {
    const dir = join(TYPES_DIR, framework)
    let files: string[]
    try {
      files = readdirSync(dir)
    } catch {
      continue
    }
    for (const file of files) {
      if (!file.endsWith('.json')) continue
      const parts = JSON.parse(readFileSync(join(dir, file), 'utf8')) as Record<string, TypePart>
      out.push({ parts, component: file.split('.')[0] ?? '', framework })
    }
  }
  return out
}

export const types: ComponentTypes[] = load()
