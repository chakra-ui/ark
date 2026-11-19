import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import type { Tool, ToolConfig } from '../lib/types.js'
import { getComponentPropsTool } from './get-component-props.js'
import { getDocsTool } from './get-docs.js'
import { getExampleTool } from './get-example.js'
import { listComponentsTool } from './list-components.js'
import { listExamplesTool } from './list-examples.js'
import { searchDocsTool } from './search-docs.js'
import { stylingGuideTool } from './styling-guide.js'

const tools: Tool[] = [
  listComponentsTool,
  listExamplesTool,
  getExampleTool,
  getComponentPropsTool,
  stylingGuideTool,
  searchDocsTool,
  getDocsTool,
]

const registered = new WeakMap<McpServer, Set<string>>()

export const initializeTools = async (server: McpServer, config?: ToolConfig) => {
  const enabledTools = tools.filter((tool) => !tool.disabled?.(config))
  const names = registered.get(server) ?? new Set<string>()
  registered.set(server, names)

  await Promise.all(
    enabledTools.map(async (tool) => {
      if (names.has(tool.name)) return
      names.add(tool.name)
      const toolCtx = await tool.ctx?.()
      tool.exec(server, {
        name: tool.name,
        description: tool.description,
        ctx: toolCtx,
        config,
      })
    }),
  )
}
