# Ark UI - Component Development Patterns

This guide covers component development patterns, example scenarios, and testing approaches across all frameworks.

## Code Standards

- **TypeScript First**: All components must be fully typed
- **Framework Consistency**: Maintain API parity across React, Solid, Svelte, and Vue
- **Accessibility**: Follow ARIA guidelines and test with screen readers
- **No Comments**: Follow existing codebase pattern of minimal commenting
- **Imports**: Use absolute imports from framework packages (`@ark-ui/solid/checkbox`)

## Component Structure

Each component follows this structure:

```
packages/{framework}/src/components/{component-name}/
├── index.tsx                    # Main export
├── {component-name}.tsx         # Component implementation
├── {component-name}.stories.tsx # Storybook stories
├── examples/                    # Usage examples
│   ├── basic.tsx
│   ├── controlled.tsx
│   └── ...
└── tests/                       # Component tests
```

## Creating New Examples

When creating a new example for a component, you must update the following files:

1. **Create example files for all frameworks**:
   - `packages/react/src/components/{component}/examples/{example-name}.tsx`
   - `packages/solid/src/components/{component}/examples/{example-name}.tsx`
   - `packages/vue/src/components/{component}/examples/{example-name}.vue`
   - `packages/svelte/src/lib/components/{component}/examples/{example-name}.svelte`

2. **Update Storybook stories for all frameworks**:
   - `packages/react/src/components/{component}/{component}.stories.tsx` - Add export
   - `packages/solid/src/components/{component}/{component}.stories.tsx` - Add export
   - `packages/vue/src/components/{component}/{component}.stories.vue` - Add import and variant
   - `packages/svelte/src/lib/components/{component}/{component}.stories.ts` - Add import and export

3. **Update component documentation**:
   - `website/src/content/pages/components/{component}.mdx` - Add `<Example id="{example-name}" />` with description

### Example Workflow

For a new "links" example on the Menu component:

1. Create example files in all four frameworks
2. Update stories:
   ```tsx
   // React/Solid: Add to exports
   export { Links } from './examples/links'

   // Vue: Add to imports and template
   import Links from './examples/links.vue'
   <Variant title="Links"><Links /></Variant>

   // Svelte: Add import and export
   import LinksExample from './examples/links.svelte'
   export const Links = { render: () => ({ Component: LinksExample }) }
   ```
3. Update MDX documentation:
   ```mdx
   ### Menu with links

   To render menu items as links, use the `asChild` prop.

   <Example id="links" />
   ```

## State Management Patterns

- **Solid**: Use `createSignal` for controlled components
- **React**: Use `useState` for controlled components
- **Vue**: Use `ref` with `v-model` patterns
- **Svelte**: Use Svelte 5 runes (`$state`, `$derived`) with `bind:` directives

## Example Structure Patterns

### React Pattern

```tsx
// Basic pattern
export const Basic = () => (
  <Component.Root>
    <Component.Label>Label</Component.Label>
    <Component.Control />
  </Component.Root>
)

// Controlled pattern
export const Controlled = () => {
  const [value, setValue] = useState('initial')

  return (
    <>
      <span>Current: {value}</span>
      <Component.Root value={value} onValueChange={setValue}>
        <Component.Label>Label</Component.Label>
        <Component.Control />
      </Component.Root>
    </>
  )
}
```

### Solid Pattern

```tsx
// Controlled pattern with createSignal
export const Controlled = () => {
  const [value, setValue] = createSignal('initial')

  return (
    <>
      <span>Current: {value()}</span>
      <Component.Root value={value()} onValueChange={setValue}>
        <Component.Label>Label</Component.Label>
        <Component.Control />
      </Component.Root>
    </>
  )
}
```

### Vue Pattern

```vue
<script setup lang="ts">
import { Component } from '@ark-ui/vue/component'
import { ref } from 'vue'

const model = ref('initial')
</script>

<template>
  <span>Current: {{ model }}</span>
  <Component.Root>
    <Component.Label>Label</Component.Label>
    <Component.Input v-model="model" />
  </Component.Root>
</template>
```

### Svelte Pattern (Svelte 5 Runes)

```svelte
<script lang="ts">
  import { Component } from '@ark-ui/svelte/component'

  let value = $state('initial')
</script>

<span>Current: {value}</span>
<Component.Root>
  <Component.Label>Label</Component.Label>
  <Component.Input bind:value />
</Component.Root>
```

## Example Scenarios Guide

Every component should include these example patterns where applicable:

### Core Examples

- `basic.{tsx,vue,svelte}` - Basic usage with default props
- `controlled.{tsx,vue,svelte}` - Controlled state with external state management
- `disabled.{tsx,vue,svelte}` - Disabled state handling
- `initial-value.{tsx,vue,svelte}` - Setting initial component values

### Integration Examples

- `with-field.{tsx,vue,svelte}` - Integration with Field component for forms
- `render-prop.{tsx,vue,svelte}` - Custom render function patterns (React/Solid)
- `render-fn.{tsx,vue,svelte}` - Function-based rendering patterns

### Advanced Examples

- `root-provider.{tsx,vue,svelte}` - **CRITICAL**: External state management using component hooks
- `context.{tsx,vue,svelte}` - Component context usage patterns
- `positioning.{tsx,vue,svelte}` - Positioning and placement (overlays)
- `lazy-mount.{tsx,vue,svelte}` - Lazy mounting for performance

### Form-Specific Examples

- `form-usage.{tsx,vue,svelte}` - Integration with form libraries
- `validation.{tsx,vue,svelte}` - Input validation patterns
- `invalid.{tsx,vue,svelte}` - Invalid state handling
- `required.{tsx,vue,svelte}` - Required field indicators

### Component-Specific Examples

- `group.{tsx,vue,svelte}` - Group/collection patterns (Checkbox, Radio)
- `multiple.{tsx,vue,svelte}` - Multiple selection (Select, File Upload)
- `async.{tsx,vue,svelte}` - Async operations and loading states
- `media-capture.{tsx,vue,svelte}` - Media capture (File Upload)

## Root Provider Pattern (Critical)

**The `root-provider` example is essential for most components** as it demonstrates external state management using component hooks:

### React Pattern

```tsx
import { Field, useField } from '@ark-ui/react/field'
import { useState } from 'react'

export const RootProvider = () => {
  const [invalid, setInvalid] = useState(false)
  const field = useField({ invalid })

  return (
    <>
      <button onClick={() => setInvalid(!invalid)}>Toggle Invalid</button>
      <Field.RootProvider value={field}>
        <Field.Label>Label</Field.Label>
        <Field.Input />
        <Field.ErrorText>Error Info</Field.ErrorText>
      </Field.RootProvider>
    </>
  )
}
```

### Solid Pattern

```tsx
import { Field, useField } from '@ark-ui/solid/field'
import { createSignal } from 'solid-js'

export const RootProvider = () => {
  const [invalid, setInvalid] = createSignal(false)
  const field = useField(() => ({ invalid: invalid() }))

  return (
    <>
      <button onClick={() => setInvalid(!invalid())}>Toggle Invalid</button>
      <Field.RootProvider value={field}>
        <Field.Label>Label</Field.Label>
        <Field.Input />
        <Field.ErrorText>Error Info</Field.ErrorText>
      </Field.RootProvider>
    </>
  )
}
```

### Vue Pattern

```vue
<script setup lang="ts">
import { Fieldset, useFieldset } from '@ark-ui/vue/fieldset'

const fieldset = useFieldset()
</script>

<template>
  <Fieldset.RootProvider :value="fieldset">
    <Fieldset.Legend>Contact Information</Fieldset.Legend>
    <div>
      <label for="name">Name</label>
      <input id="name" type="text" required />
    </div>
    <Fieldset.HelperText>Please fill out required fields</Fieldset.HelperText>
  </Fieldset.RootProvider>
</template>
```

### Svelte Pattern (Svelte 5 Runes)

```svelte
<script lang="ts">
  import { Field, useField } from '@ark-ui/svelte/field'

  let invalid = $state(false)
  let field = $derived(useField({ invalid }))

  function toggleInvalid() {
    invalid = !invalid
  }
</script>

<button onclick={toggleInvalid}>Toggle Invalid</button>
<Field.RootProvider value={field}>
  <Field.Label>Label</Field.Label>
  <Field.Input />
  <Field.ErrorText>Error Info</Field.ErrorText>
</Field.RootProvider>
```

## Form Integration Patterns

- Use `Field` component for form controls
- Include validation states (`invalid`, `required`)
- Demonstrate error handling and helper text
- Show integration with form libraries (Modular Forms for Solid)

## Portal Rendering Patterns

Each framework has different approaches to rendering content outside the normal DOM tree (portals):

### React Portal Pattern

```tsx
import { Portal } from '@ark-ui/react/portal'

export const PortalExample = () => (
  <Popover.Root portalled>
    <Popover.Trigger>Open</Popover.Trigger>
    <Portal>
      <Popover.Positioner>
        <Popover.Content>Content rendered to document.body</Popover.Content>
      </Popover.Positioner>
    </Portal>
  </Popover.Root>
)

// With custom container
export const CustomPortal = () => {
  const containerRef = useRef<HTMLDivElement>(null)

  return (
    <>
      <div ref={containerRef} />
      <Portal container={containerRef}>
        <div>Rendered to custom container</div>
      </Portal>
    </>
  )
}
```

### Solid Portal Pattern

```tsx
import { Portal } from 'solid-js/web' // Uses Solid's built-in Portal

export const PortalExample = () => (
  <Popover.Root portalled>
    <Popover.Trigger>Open</Popover.Trigger>
    <Portal>
      <Popover.Positioner>
        <Popover.Content>Content rendered to document.body</Popover.Content>
      </Popover.Positioner>
    </Portal>
  </Popover.Root>
)

// With custom mount point
export const CustomPortal = () => (
  <Portal mount={document.getElementById('portal-root')}>
    <div>Rendered to custom mount point</div>
  </Portal>
)
```

### Vue Portal Pattern

```vue
<script setup lang="ts">
import { Combobox } from '@ark-ui/vue/combobox'
import { Teleport } from 'vue'
</script>

<template>
  <Combobox.Root>
    <Combobox.Trigger>Open</Combobox.Trigger>
    <!-- Vue uses built-in Teleport for portalling -->
    <Teleport to="body">
      <Combobox.Positioner>
        <Combobox.Content>Content rendered to document.body</Combobox.Content>
      </Combobox.Positioner>
    </Teleport>
  </Combobox.Root>

  <!-- Custom container -->
  <Teleport to="#portal-container">
    <div>Content rendered to specific element</div>
  </Teleport>

  <!-- Conditional portalling -->
  <Teleport to="body" v-if="shouldPortal">
    <div>Conditionally portalled content</div>
  </Teleport>

  <!-- Iframe portalling (Frame component) -->
  <Teleport :to="frameRef?.contentDocument?.body">
    <div>Content rendered to iframe body</div>
  </Teleport>
</template>
```

### Svelte Portal Pattern

```svelte
<script lang="ts">
  import { Portal } from '@ark-ui/svelte/portal'
  import { Popover } from '@ark-ui/svelte/popover'
</script>

<Popover.Root portalled>
  <Popover.Trigger>Open</Popover.Trigger>
  <Portal>
    <Popover.Positioner>
      <Popover.Content>Content rendered to document.body</Popover.Content>
    </Popover.Positioner>
  </Portal>
</Popover.Root>

<!-- With custom container -->
<Portal container={customElement}>
  <div>Content rendered to custom container</div>
</Portal>

<!-- Disabled portal (renders inline) -->
<Portal disabled={true}>
  <div>Content rendered inline when disabled</div>
</Portal>
```

### Portal Implementation Details

- **React**: Uses `@ark-ui/react/portal` which wraps `ReactDOM.createPortal`
- **Solid**: Uses Solid's built-in `Portal` from `solid-js/web`
- **Vue**: Uses Vue's built-in `Teleport` component for all portalling needs
- **Svelte**: Uses `@ark-ui/svelte/portal` with Svelte 5 `mount`/`unmount` APIs

### When to Use Portals

- **Overlay Components**: Modals, popovers, tooltips, menus, comboboxes, select dropdowns
- **Z-Index Issues**: When content needs to escape stacking contexts
- **Custom Positioning**: Content that needs to be positioned relative to viewport
- **Nested Menus**: Submenus that need to escape parent overflow constraints

### Portal Props Pattern

```ts
// React/Svelte Portal Props
interface PortalProps {
  disabled?: boolean        // Renders inline when true
  container?: HTMLElement   // Custom mount point
  children: ReactNode       // Content to portal
}

// Vue Teleport Props
interface TeleportProps {
  to: string | Element      // Target selector or element
  disabled?: boolean        // Renders inline when true
}
```

### Framework-Specific Considerations

- **React/Svelte**: Explicit `<Portal>` wrapper component required
- **Solid**: Uses framework's native `Portal` with `mount` prop for custom targets
- **Vue**: Uses `Teleport` with `to` prop for target specification
- **All**: Support conditional rendering and custom containers

## Testing Guidelines

### Accessibility Testing

**vitest-axe Integration:**
```ts
import { axe } from 'vitest-axe'
import { render } from '@testing-library/react' // or framework equivalent

test('should not have accessibility violations', async () => {
  const { container } = render(<Component />)
  const results = await axe(container)
  expect(results).toHaveNoViolations()
})
```

**Keyboard Navigation Testing:**
```ts
import { fireEvent } from '@testing-library/react'

test('should handle keyboard navigation', async () => {
  render(<Component />)

  // Test Tab navigation
  fireEvent.keyDown(screen.getByRole('button'), { key: 'Tab' })
  expect(screen.getByRole('menuitem')).toHaveFocus()

  // Test Arrow key navigation
  fireEvent.keyDown(document.activeElement, { key: 'ArrowDown' })
  expect(screen.getAllByRole('menuitem')[1]).toHaveFocus()

  // Test Enter/Space activation
  fireEvent.keyDown(document.activeElement, { key: 'Enter' })
  expect(onSelect).toHaveBeenCalled()
})
```

**ARIA Attributes Testing:**
```ts
test('should have correct ARIA attributes', () => {
  render(<Component expanded={true} />)

  expect(screen.getByRole('button')).toHaveAttribute('aria-expanded', 'true')
  expect(screen.getByRole('menu')).toHaveAttribute('aria-labelledby')
  expect(screen.getByRole('menuitem')).toHaveAttribute('aria-selected')
})
```

### Cross-Framework Testing Patterns

**React Testing:**
```ts
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
```

**Solid Testing:**
```ts
import { render, screen } from '@solidjs/testing-library'
```

**Vue Testing:**
```ts
import { render, screen } from '@testing-library/vue'
```

**Svelte Testing:**
```ts
import { render, screen } from '@testing-library/svelte'
```

### Component State Testing

**Controlled vs Uncontrolled:**
```ts
test('controlled component', () => {
  const onValueChange = vi.fn()
  render(<Component value="test" onValueChange={onValueChange} />)

  // Value should be controlled externally
  expect(screen.getByDisplayValue('test')).toBeInTheDocument()
})

test('uncontrolled component', () => {
  render(<Component defaultValue="test" />)

  // Component manages its own state
  const input = screen.getByRole('textbox')
  userEvent.type(input, 'new text')
  expect(input).toHaveValue('testnew text')
})
```

### Screen Reader Compatibility

**Announcement Testing:**
```ts
test('should announce state changes', async () => {
  render(<Component />)

  const button = screen.getByRole('button')
  userEvent.click(button)

  // Check for live region updates
  await waitFor(() => {
    expect(screen.getByRole('status')).toHaveTextContent('Menu opened')
  })
})
```

**Focus Management:**
```ts
test('should manage focus correctly', () => {
  render(<Dialog />)

  const trigger = screen.getByText('Open Dialog')
  userEvent.click(trigger)

  // Focus should move to dialog
  expect(screen.getByRole('dialog')).toHaveFocus()

  // Escape should return focus
  fireEvent.keyDown(document.activeElement, { key: 'Escape' })
  expect(trigger).toHaveFocus()
})
```

## Storybook Stories

- Group related examples in logical categories
- Use consistent naming: `Basic`, `Controlled`, `With Field`, etc.
- Include interactive controls for key props
- Document prop types and usage patterns

## Cross-Framework Considerations

- Maintain identical example functionality across frameworks
- Use framework-specific patterns (SolidJS signals, Vue refs, Svelte stores)
- Ensure consistent prop naming and behavior
- Test examples work identically in all target frameworks

## Performance Best Practices

- Minimize re-renders with proper memoization
- Use lazy mounting for heavy components (`lazy-mount.tsx`)
- Implement proper cleanup in unmount handlers
- Follow framework-specific performance patterns