# Ark UI - Project Overview

Ark UI is a headless component library for building scalable Design Systems across React, Solid, Svelte, and Vue. Built on top of Zag.js state machines, it provides unstyled, accessible UI components.

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

## Available Components

- **Form Controls**: Checkbox, Field, Fieldset, Number Input, Password Input, Pin Input, Radio Group, Select, Switch, Tags Input
- **Data Display**: Avatar, Progress, Rating Group, Signature Pad, Toast, Tree View
- **Navigation**: Menu, Pagination, Tabs, Tour
- **Layout**: Accordion, Collapsible, Splitter
- **Feedback**: Dialog, Hover Card, Popover, Tooltip
- **Media**: Carousel, File Upload
- **Input**: Angle Slider, Color Picker, Date Picker, Editable, Slider
- **Overlays**: Bottom Sheet, Floating Panel

## Architecture

- **Zag.js**: State machine foundation for component logic
- **Turbo**: Monorepo build orchestration
- **Bun**: Package manager and runtime
- **Biome**: Code linting and formatting
- **Vitest**: Testing framework
- **Storybook**: Component development environment

## Example Development Status

The project tracks component example consistency across frameworks in `COMPONENT_EXAMPLES_DIFF.md`. Key areas needing attention:

### Priority Areas

1. **Tree View**: Missing async and checkbox examples in Solid/Svelte
2. **Checkbox**: Missing advanced group examples in Solid
3. **File Upload**: Missing validation examples across frameworks

### Recently Completed ✅

- **Field Component**: All frameworks now have complete examples
- **Vue Framework**: Major improvement with 10+ new examples
- **Select Component**: Dynamic items and select-all patterns

## Security Considerations

- Never log or expose sensitive data
- Sanitize user inputs in examples
- Follow secure coding practices for file uploads
- Validate props and handle edge cases gracefully

## Design System Inspiration

When designing components and APIs, we draw inspiration from these leading headless component libraries:

**Reference Libraries:**

- **[Base UI](https://mui.com/base-ui/)** - MUI's headless component library with excellent accessibility patterns
- **[Reka UI](https://reka-ui.com/)** - Vue-focused headless components with clean API design
- **[Radix UI](https://radix-ui.com/)** - React primitives with exceptional accessibility and developer experience
- **[React Spectrum](https://react-spectrum.adobe.com/)** - Adobe's design system with robust accessibility and internationalization

**What to Learn:**

- **API Design Patterns**: Consistent prop naming, component composition patterns
- **Accessibility Best Practices**: ARIA implementation, keyboard navigation, screen reader support
- **State Management**: Controlled vs uncontrolled patterns, state synchronization
- **Developer Experience**: TypeScript patterns, documentation approaches, example quality
- **Component Architecture**: Compound components, render props, context usage

**Research Approach:**

1. **Component Comparison**: When implementing new components, study how each library approaches the same component
2. **API Consistency**: Ensure our API patterns align with established conventions
3. **Accessibility Standards**: Adopt proven accessibility patterns and ARIA practices
4. **Documentation Style**: Learn from their documentation structure and example patterns

## Contributing

1. Follow existing code patterns and conventions
2. Add TypeScript types for all new code
3. Include Storybook stories for components
4. Write tests for component behavior
5. Ensure accessibility compliance
6. Update `COMPONENT_EXAMPLES_DIFF.md` when adding examples