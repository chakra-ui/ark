export interface TransformResult {
  code: string | null
  count: number
  skipped: string[]
}

export interface TransformOptions {
  crossFile?: boolean
}

export type Transform = (source: string, filePath: string, options?: TransformOptions) => TransformResult

export interface TransformDef {
  name: string
  description: string
  extensions: string[]
  run: Transform
}
