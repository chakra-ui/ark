#!/usr/bin/env node
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js'
import { server } from './server.js'
import { initializeTools } from './tools/index.js'

async function main() {
  await initializeTools(server)

  const transport = new StdioServerTransport()
  await server.connect(transport)
  console.info('Ark UI MCP Server running on stdio')
}

main().catch((error) => {
  console.error('Fatal error in main():', error)
  process.exit(1)
})
