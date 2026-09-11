export interface TransformResult {
  code: string | null
  count: number
  skipped: string[]
}

export type Transform = (source: string, filePath: string) => TransformResult

export interface TransformDef {
  name: string
  description: string
  extensions: string[]
  run: Transform
}
