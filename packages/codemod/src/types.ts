export interface TransformResult {
  /** The rewritten source, or null when the file needed no change. */
  code: string | null
  /** How many sites were rewritten. */
  count: number
  /** Sites the transform recognised but deliberately left alone, with a reason. */
  skipped: string[]
}

export type Transform = (source: string, filePath: string) => TransformResult

export interface TransformDef {
  name: string
  description: string
  /** File extensions this transform understands. */
  extensions: string[]
  run: Transform
}
