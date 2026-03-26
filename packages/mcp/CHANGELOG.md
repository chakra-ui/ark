# @ark-ui/mcp

## [1.2.1] - 2026-03-26

### Fixed

- Fixed MCP server startup error in Google Antigravity and other MCP clients by using `console.error` instead of
  `console.info` for startup messages, preventing stdout pollution of the MCP protocol.

## [1.2.0] - 2025-09-04

### Added

- Added `get_component_props` tool to retrieve component props/properties for specific Ark UI components

## [1.1.2] - 2025-09-03

### Fixed

Add missing node shebang to the `stdio` script.

## [1.1.1] - 2025-09-01

### Fixed

Don't ship the `src` directory to the package.

## [1.1.0] - 2025-09-01

### Added

- Initial release of the official MCP server for Ark UI
