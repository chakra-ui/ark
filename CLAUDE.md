# Ark UI - Claude Development Guide

Ark UI is a headless component library for building scalable Design Systems across React, Solid, Svelte, and Vue. Built
on top of Zag.js state machines, it provides unstyled, accessible UI components.

## Documentation Structure

This guide is split into focused documents for better navigation:

- **[Overview](@.claude/docs/overview.md)** - Project overview, architecture, and available components
- **[Development](@.claude/docs/development.md)** - Development workflows, commands, and processes
- **[Component Patterns](@.claude/docs/component_patterns.md)** - Component development patterns, examples, and testing
- **[Framework Patterns](@.claude/docs/framework_patterns.md)** - Framework-specific patterns and advanced
  implementations

## Quick Start

### Common Commands

```bash
# Install dependencies
bun install

# Build all packages
bun run build

# Run tests across all packages
bun run test

# Type check all packages
bun run typecheck

# Lint all packages
bun run lint

# Format code
bun run format
```

### Framework Development

```bash
# Work with specific framework packages
bun run react dev      # React Storybook on port 6006
bun run solid dev      # Solid Storybook on port 6006
bun run svelte dev     # Svelte Storybook on port 6006
bun run vue dev        # Vue Storybook on port 6006
```

### Claude Code Commands

The project includes Claude Code slash commands in `.claude/commands/`:

- `/zag` - Implement a Zag.js component in Ark UI (follows specific implementation workflow)

## Project Structure

```
ark/
├── packages/           # Framework-specific implementations
│   ├── react/         # React components
│   ├── solid/         # SolidJS components
│   ├── svelte/        # Svelte components
│   └── vue/           # Vue components
├── website/           # Documentation site
├── templates/         # Project templates
├── integrations/      # Third-party integrations
└── scripts/           # Build and utility scripts
```

## Key Principles

- **TypeScript First**: All components must be fully typed
- **Framework Consistency**: Maintain API parity across React, Solid, Svelte, and Vue
- **Accessibility**: Follow ARIA guidelines and test with screen readers
- **No Comments**: Follow existing codebase pattern of minimal commenting
- **Imports**: Use absolute imports from framework packages (`@ark-ui/solid/checkbox`)

## Contributing

1. Follow existing code patterns and conventions
2. Add TypeScript types for all new code
3. Include Storybook stories for components
4. Write tests for component behavior
5. Ensure accessibility compliance

For detailed information on any topic, refer to the specific documentation files linked above.
