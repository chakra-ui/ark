import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import type { Tool, ToolConfig } from '../lib/types.js'
import { getComponentPropsTool } from './get-component-props.js'
import { getExampleTool } from './get-example.js'
import { listComponentsTool } from './list-components.js'
import { listExamplesTool } from './list-examples.js'
import { stylingGuideTool } from './styling-guide.js'

const tools: Tool[] = [listComponentsTool, listExamplesTool, getExampleTool, getComponentPropsTool, stylingGuideTool]

const registeredToolCache = new Map<string, Tool>()

export const initializeTools = async (server: McpServer, config?: ToolConfig) => {
  const enabledTools = tools.filter((tool) => !tool.disabled?.(config))

  await Promise.all(
    enabledTools.map(async (tool) => {
      const toolCtx = await tool.ctx?.()
      if (registeredToolCache.has(tool.name)) {
        return
      }
      registeredToolCache.set(tool.name, tool)
      tool.exec(server, {
        name: tool.name,
        description: tool.description,
        ctx: toolCtx,
        config,
      })
    }),
  )
}
