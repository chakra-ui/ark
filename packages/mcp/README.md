# Ark UI MCP Server

An MCP server providing AI assistants with access to Ark UI components, examples, documentation, and styling guides
across React, Vue, Svelte, and Solid.js frameworks.

## Features

- **Component Discovery**: List all available components for any framework
- **Example Retrieval**: Get complete, runnable code examples
- **Documentation Search**: Search docs and fetch full page content
- **Styling Guides**: Access CSS variables and data attributes for customization
- **Multi-Framework**: Support for React, Vue, Svelte, and Solid.js

## Available Tools

- `list_components` - List all Ark UI components for a framework
- `list_examples` - Get available examples for a component
- `get_example` - Retrieve complete example code with dependencies
- `get_component_props` - Get component props for a framework
- `styling_guide` - Get CSS variables and data attributes for styling
- `search_docs` - Search documentation pages by keyword
- `get_docs` - Get full markdown documentation for a page slug

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
