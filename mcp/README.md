# Ark UI MCP Server

An MCP server providing AI assistants with access to Ark UI components, examples, and styling guides across React, Vue,
Svelte, and Solid.js frameworks.

## Features

- **Component Discovery**: List all available components for any framework
- **Example Retrieval**: Get complete, runnable code examples
- **Styling Guides**: Access CSS variables and data attributes for customization
- **Multi-Framework**: Support for React, Vue, Svelte, and Solid.js

## Available Tools

- `list_components` - List all Ark UI components for a framework
- `list_examples` - Get available examples for a component
- `get_example` - Retrieve complete example code with dependencies
- `styling_guide` - Get CSS variables and data attributes for styling

## Setup

### Claude Desktop / Cursor

```json
{
  "mcpServers": {
    "ark-ui": {
      "command": "npx",
      "args": ["-y", "@ark-ui/mcp"]
    }
  }
}
```

## License

MIT @ Chakra Systems
