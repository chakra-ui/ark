import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'

export const server = new McpServer({
  name: 'ark-ui',
  version: '1.0.0',
  capabilities: {
    prompts: {},
    resources: {},
    tools: {},
  },
})
