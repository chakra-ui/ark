import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'

export interface ToolConfig {
  apiKey?: string
}

export interface Tool<T = unknown> {
  name: string
  description: string
  ctx?(): Promise<T>
  disabled?(config?: ToolConfig): boolean
  exec(
    server: McpServer,
    opts: { ctx: T; name: string; description: string; config?: ToolConfig },
  ): Promise<void> | undefined
}
export interface ListExamplesResponse {
  framework: string
  components: {
    component: string
    examples: {
      id: string
      path: string
    }[]
  }[]
}

export interface ListComponentExamplesResponse {
  framework: string
  component: string
  count: number
  examples: Example[]
  path: string
}

export interface GetExampleResponse {
  id: string
  framework: string
  component: string
  files: { name: string; content: string; npmDependencies: string[] }[]
}

export interface GetStyleGuideResponse {
  dataAttr?: Record<string, string>
  cssVar?: Record<string, string>
}

export interface Example {
  id: string
  filename: string
  url: string
}

export const FRAMEWORKS = ['react', 'vue', 'svelte', 'solid'] as const
