---
'@ark-ui/mcp': patch
---

Fixed MCP server startup error in Google Antigravity and other MCP clients by using `console.error`
instead of `console.info` for startup messages, preventing stdout pollution of the MCP protocol.
