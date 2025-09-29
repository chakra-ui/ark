# Ark UI - Development Guide

This guide covers development workflows, commands, and processes for working with the Ark UI codebase.

## Common Commands

### Development

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

### Claude Code Commands

The project includes Claude Code slash commands in `.claude/commands/`:

- `/zag` - Implement a Zag.js component in Ark UI (follows specific implementation workflow)

**Zag Component Implementation Workflow:**

1. Ensure component is installed across all frameworks
2. Check `[component]-types.d.ts` for API and anatomy understanding
3. Implement similar to existing component patterns (e.g. `avatar/src`)
4. Style in `.storybook/styles` (CSS only, no Tailwind/style props)
5. Create examples folder and agree on example list
6. Create/update stories file based on framework
7. Repeat for all frameworks with approval

### Framework-Specific Development

```bash
# Work with specific framework packages
bun run react <command>    # packages/react
bun run solid <command>    # packages/solid
bun run svelte <command>   # packages/svelte
bun run vue <command>      # packages/vue

# Example: Run Solid Storybook
bun run solid dev          # Runs storybook on port 6006
```

### Package-Level Commands

Each framework package supports:

- `dev` - Start Storybook development server
- `build` - Build the package
- `test` - Run tests
- `typecheck` - Type checking
- `lint` - Lint code

### Utility Scripts

```bash
# Check component anatomy consistency
bun run check:anatomy

# Check exports consistency
bun run check:exports

# Check Zag.js version alignment
bun run check:zag

# Sync exports across packages
bun run exports:sync

# Local development sync
bun run local:sync
bun run local:revert
```

## Testing

```bash
# Run all tests
bun run test

# Run tests for specific package
cd packages/solid && bun run test

# Run with coverage
cd packages/solid && bun run test:coverage
```

## Storybook Development

Each framework package includes Storybook for component development:

```bash
# Start Storybook for specific framework
bun run solid dev      # Port 6006
bun run react dev      # Port 6006
bun run vue dev        # Port 6006
bun run svelte dev     # Port 6006
```

## Development Workflow

### Component Development Process

1. **Component Structure Setup:**
   ```bash
   packages/{framework}/src/components/{component-name}/
   ├── index.{tsx,ts}                     # Main export file
   ├── {component-name}.{tsx,vue,svelte}  # Root component
   ├── {component-name}-*.{tsx,vue,svelte} # Sub-components
   ├── {component-name}.anatomy.ts        # Anatomy definition (required)
   ├── {component-name}.stories.{tsx,vue,svelte} # Storybook stories
   ├── {component-name}.types.ts          # Vue: Type definitions
   ├── use-{component-name}.ts            # Component hook
   ├── use-{component-name}-context.ts    # Context hook
   └── examples/                          # Usage examples
       ├── basic.{tsx,vue,svelte}
       ├── controlled.{tsx,vue,svelte}
       └── ...
   ```

2. **Anatomy Definition (Required):**
   ```ts
   // {component}.anatomy.ts
   import { createAnatomy } from '@zag-js/anatomy'

   export const componentAnatomy = createAnatomy('component').parts(
     'root',
     'label',
     'control',
     // ... all component parts
   )

   export const parts = componentAnatomy.build()
   ```

3. **Export Patterns:**
   - All components must export anatomy
   - BaseProps and Props types for each part
   - Hook exports (useComponent, useComponentContext)
   - Namespace export for dot notation

### Story File Requirements

**Naming Convention:**
```ts
// {component}.stories.{tsx,vue,svelte}
export default {
  title: 'Components/{Component}',
}

export const Basic = () => ({ ... })
export const Controlled = () => ({ ... })
export const WithField = () => ({ ... })
```

**Story Categories:**
- **Basic**: Default component usage
- **Controlled**: External state management
- **Variants**: Different visual styles
- **Integration**: Usage with other components (Field, etc.)
- **Advanced**: Complex scenarios and edge cases

### Example Development Guidelines

**Example Naming Requirements:**
- Use descriptive, consistent names across frameworks
- Follow existing patterns from similar components
- Include common scenarios (basic, controlled, disabled, invalid)

**Framework Consistency:**
```bash
# All frameworks should have equivalent examples
packages/react/src/components/field/examples/controlled.tsx
packages/solid/src/components/field/examples/controlled.tsx
packages/vue/src/components/field/examples/controlled.vue
packages/svelte/src/lib/components/field/examples/controlled.svelte
```

**Example Documentation:**
- Update `COMPONENT_EXAMPLES_DIFF.md` when adding examples
- Include description of what the example demonstrates
- Note framework-specific implementation details

### Type System Requirements

**Required Type Exports:**
```ts
// Every component part must export both BaseProps and Props
export interface ComponentRootBaseProps extends UseComponentProps, PolymorphicProps {}
export interface ComponentRootProps extends ComponentRootBaseProps, HTMLAttributes {}

// Vue additionally needs .types.ts files
export interface RootProps { ... }
export type RootEmits = { ... }
```

### Quality Checklist

**Before Component Completion:**
- [ ] Anatomy file created and exported
- [ ] All component parts have BaseProps and Props types
- [ ] Context provider implemented
- [ ] Storybook stories created
- [ ] Basic examples created for all frameworks
- [ ] Accessibility tested with vitest-axe
- [ ] Cross-framework API consistency verified
- [ ] `COMPONENT_EXAMPLES_DIFF.md` updated

**Before Release:**
- [ ] All frameworks have equivalent functionality
- [ ] Examples work identically across frameworks
- [ ] Types generated for website documentation
- [ ] Accessibility compliance verified
- [ ] Performance testing completed

## Website Development

The Ark UI documentation website is built with Next.js and uses several key patterns for content management and documentation generation.

### Website Structure

```
website/
├── src/
│   ├── app/                 # Next.js app router pages
│   ├── components/          # React components for the website
│   ├── content/             # MDX content and type definitions
│   │   ├── pages/           # Documentation pages (.mdx)
│   │   └── types/           # Component type definitions (.json)
│   ├── demos/               # Interactive component demos
│   └── lib/                 # Utility functions
├── .storybook/              # Storybook configuration
├── velite.config.ts         # Content management configuration
└── panda.config.ts          # Styling configuration
```

### Content Management (Velite)

The website uses **Velite** for content management with these collections:

**Pages Collection:**

- Located in `src/content/pages/`
- MDX files for documentation pages
- Automatically generates routing from file structure
- Includes changelog generation from package CHANGELOG.md files

**Types Collection:**

- Located in `src/content/types/{framework}/`
- JSON files with component prop definitions
- Generated automatically from TypeScript types
- Powers the API Reference sections

**Example MDX Page Structure:**

```mdx
---
id: field
title: Field
description: Provides a flexible container for form inputs.
---

<ComponentPreview id="Field" />

## Examples

### Basic Usage

<Example id="input" />

### With Custom Control

<Example id="custom-control" />

## API Reference

<ComponentTypes id="field" />
```

### Demo System

**Demo Files (src/demos/):**

- Each component has a `.demo.tsx` file
- Exported as named exports in `index.ts`
- Used for interactive previews on the website
- Follow `export const Demo = () => { ... }` pattern

**Demo Integration:**

```tsx
// In demos/field.demo.tsx
export const Demo = () => (
  <Field.Root>
    <Field.Label>Label</Field.Label>
    <Field.Input type="email" asChild>
      <Input />
    </Field.Input>
  </Field.Root>
)

// Referenced in MDX via:
<ComponentPreview id="Field" />
```

### Example Loading System

**Example Components:**

- Framework examples loaded from package `examples/` folders
- Referenced in MDX via `<Example id="example-name" />`
- Supports cross-component references: `<Example component="checkbox" id="with-field" />`

**Example Patterns:**

```mdx
<!-- Load from current component -->

<Example id="basic" />

<!-- Load from different component -->

<Example component="checkbox" id="with-field" />

<!-- Load with specific framework -->

<Example id="controlled" framework="react" />
```

### Component Anatomy System

**Anatomy Definition:**

- Each component has `{component}.anatomy.ts` file
- Uses `@zag-js/anatomy` to define component parts
- Powers documentation and styling consistency

```tsx
// field.anatomy.ts
export const fieldAnatomy = createAnatomy('field').parts(
  'root',
  'label',
  'input',
  'errorText',
  'helperText',
  'requiredIndicator',
)
```

### Type Generation

**Component Types:**

- Generated automatically from TypeScript component props
- Stored in `src/content/types/{framework}/{component}.types.json`
- Powers `<ComponentTypes id="field" />` in documentation
- Include prop types, descriptions, and default values

**Type File Structure:**

```json
{
  "Root": {
    "props": {
      "disabled": {
        "type": "boolean",
        "isRequired": false,
        "description": "Indicates whether the field is disabled."
      }
    },
    "element": "HTMLDivElement"
  }
}
```

### Styling System

**Panda CSS:**

- Uses Panda CSS for styling with Park UI preset
- Component styles in `.storybook/styles/` directory
- CSS-only approach (no Tailwind or inline styles)
- Shared across all frameworks for consistency

### Website Development Workflow

1. **Content Updates:**
   - Edit MDX files in `src/content/pages/`
   - Add new demos in `src/demos/`
   - Update component examples in package `examples/` folders

2. **Type Generation:**
   - Types auto-generated from component TypeScript definitions
   - Updated when component props change
   - Used in API Reference sections

3. **Example Integration:**
   - Examples automatically loaded from framework packages
   - Referenced in MDX using consistent naming conventions
   - Cross-framework example parity tracked in `COMPONENT_EXAMPLES_DIFF.md`

### Website Commands

```bash
# Start development server
bun run web dev

# Build website
bun run web build

# Generate content (Velite)
bun run web prepare
```