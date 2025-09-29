# Ark UI - Framework-Specific Patterns

This guide covers advanced patterns, utilities, and implementation details specific to each framework.

## Ref Synchronization Strategies

Each framework handles refs differently, requiring specific synchronization patterns:

### React Pattern

```tsx
const ref = useRef<HTMLElement>(null)
useEffect(() => {
  if (ref.current) {
    component.setRootRef(ref.current)
  }
}, [component])

return <div ref={ref} {...component.getRootProps()} />
```

### Solid Pattern

```tsx
let ref: HTMLElement | undefined
createEffect(() => {
  if (ref) {
    component().setRootRef(ref)
  }
})

return <div ref={ref} {...component().getRootProps()} />
```

#### Conditional Rendering

Solid.js uses the `<Show>` component for conditional rendering instead of boolean expressions:

```tsx
import { Show } from 'solid-js'

// Preferred: Use Show component
<Show when={isVisible()}>
  <div>Content to show conditionally</div>
</Show>

// Avoid: Boolean expression rendering
{isVisible() && <div>Content</div>}
```

**Benefits of `<Show>`:**
- Better performance with reactive updates
- Proper cleanup of nested reactive computations
- More explicit conditional rendering semantics
- Consistent with Solid.js reactive patterns

### Vue Pattern

```vue
<script setup lang="ts">
const component = useComponent(props, emits)
ComponentProvider(component)
useForwardExpose() // Handles complex ref forwarding
</script>

<template>
  <ark.div v-bind="component.getRootProps()" :ref="component.refs.rootRef">
    <slot />
  </ark.div>
</template>
```

### Svelte Pattern

```svelte
<script lang="ts">
  let { ref = $bindable(null), ...props } = $props()

  function setNode(node: Element | null) {
    component().setRootRef(node)
  }
</script>

<Ark as="div" bind:ref {...mergedProps} {@attach setNode} />
```

## Factory Pattern Implementation

### Ark Component Factory

```ts
// All frameworks use the ark factory for polymorphic components
<ark.div {...props} asChild={asChild}>  // Vue
<Ark as="div" {...props} {asChild}>     // Svelte
<ark.div {...props} asChild={asChild}>  // React/Solid
```

**Benefits:**

- Consistent API across frameworks
- Polymorphic component composition
- asChild prop for component slot replacement
- Automatic prop forwarding and merging

## Context Provider Patterns

### React/Solid

```tsx
const [ComponentProvider, useComponentContext] = createContext<ComponentApi>()

export const ComponentRoot = () => {
  const component = useComponent(props)
  return <ComponentProvider value={component}>{children}</ComponentProvider>
}
```

### Vue

```ts
// Context through provide/inject with composables
export const ComponentProvider = (value: ComponentApi) => {
  provide(ComponentContext, value)
}

export const useComponentContext = () => {
  return inject(ComponentContext)
}
```

### Svelte

```ts
// Context through setContext/getContext
export const ComponentProvider = (component: ComponentApi) => {
  setContext('component', component)
}

export const useComponentContext = (): ComponentApi => {
  return getContext('component')
}
```

## Boolean Prop Handling

### Three-State Boolean Logic

```ts
// Correct: undefined allows Zag.js to use defaults
disabled?: boolean | undefined

// Incorrect: false overrides Zag.js defaults
disabled?: boolean = false
```

### Framework-Specific Defaults

```ts
// Vue: Explicit undefined defaults
withDefaults(defineProps<Props>(), {
  disabled: undefined,
} satisfies BooleanDefaults<Props>)

// Svelte: $bindable with undefined
let { disabled = $bindable(undefined) } = $props()

// React/Solid: Optional props default to undefined
interface Props {
  disabled?: boolean // Already defaults to undefined
}
```

## Emit vs Callback Patterns

### Vue Emit Pattern

```ts
export type RootEmits = {
  'update:checked': [checked: boolean] // v-model integration
  checkedChange: [details: ChangeDetails] // Callback pattern
}

const emits = defineEmits<RootEmits>()
emits('update:checked', newValue)
emits('checkedChange', details)
```

### Other Frameworks Callback Pattern

```ts
interface Props {
  onCheckedChange?: (details: ChangeDetails) => void
}
```

## Component Export Patterns

Each component follows a consistent export structure with framework-specific variations:

### React/Solid/Svelte - Individual Exports (index.ts)

```ts
// Named exports for direct imports with both Props and BaseProps types
export { ComponentRoot, type ComponentRootBaseProps, type ComponentRootProps } from './component-root'
export { ComponentLabel, type ComponentLabelBaseProps, type ComponentLabelProps } from './component-label'
export {
  ComponentRootProvider,
  type ComponentRootProviderBaseProps,
  type ComponentRootProviderProps,
} from './component-root-provider'
export { useComponent, type UseComponentProps, type UseComponentReturn } from './use-component'

// Anatomy and utilities
export { componentAnatomy } from './component.anatomy'

// Namespace export for dot notation
export * as Component from './component'
```

### Vue - Individual Exports (index.ts)

```ts
// Vue exports components as default exports from .vue files
export { default as FieldRoot, type FieldRootBaseProps, type FieldRootProps } from './field-root.vue'
export { default as FieldLabel, type FieldLabelBaseProps, type FieldLabelProps } from './field-label.vue'
export {
  default as FieldRootProvider,
  type FieldRootProviderBaseProps,
  type FieldRootProviderProps,
} from './field-root-provider.vue'

// Hooks and utilities
export { useField, type UseFieldProps, type UseFieldReturn } from './use-field'
export { fieldAnatomy } from './field.anatomy'

// Namespace export for dot notation
export * as Field from './field'
```

### Vue Types Pattern ({component}.types.ts)

Vue components use dedicated types files for prop definitions:

```ts
// field.types.ts - Shared prop interfaces
export interface RootProps {
  disabled?: boolean
  invalid?: boolean
  required?: boolean
  // ... other props
}

export type RootEmits = {
  'update:value': [value: string]
  // ... other emits
}
```

### Vue Component Pattern (.vue files)

```vue
<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'
import type { RootProps, RootEmits } from './component.types'

export interface ComponentRootBaseProps extends RootProps, PolymorphicProps {}
export interface ComponentRootProps extends ComponentRootBaseProps, HTMLAttributes {}
export interface ComponentRootEmits extends RootEmits {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useComponent } from './use-component'
import { ComponentProvider } from './use-component-context'
import { useForwardExpose } from '../../utils/use-forward-expose'

const props = withDefaults(defineProps<ComponentRootProps>(), {
  disabled: undefined,
  invalid: undefined,
})
const emits = defineEmits<ComponentRootEmits>()

// Initialize component logic with Zag.js
const component = useComponent(props, emits)
ComponentProvider(component)

// Forward template refs and expose component instance
useForwardExpose()
</script>

<template>
  <ark.div v-bind="component.getRootProps()" :as-child="asChild">
    <slot />
  </ark.div>
</template>
```

### Vue-Specific Utilities

**useForwardExpose()** - Vue ref forwarding utility:

- Forwards template refs to parent components
- Exposes component props and methods to parent
- Handles Vue's complex ref forwarding for compound components
- Credit to Radix Vue team for the implementation pattern
- Essential for proper Vue component composition and template refs

### Namespace Exports (component.ts)

```ts
// Aliased exports for Component.Root syntax
export { ComponentRoot as Root } from './component-root'
export { ComponentLabel as Label } from './component-label'
export { ComponentRootProvider as RootProvider } from './component-root-provider'
```

### Svelte Component Pattern (.svelte files)

Svelte 5 uses the new runes syntax for component development:

```svelte
<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'
  import type { UseComponentProps } from './use-component.svelte'

  export interface ComponentRootBaseProps extends UseComponentProps, PolymorphicProps<'div'>, RefAttribute {}
  export interface ComponentRootProps extends Assign<HTMLProps<'div'>, ComponentRootBaseProps> {}
</script>

<script lang="ts">
  import { createSplitProps } from '$lib/utils/create-split-props'
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { ComponentProvider } from './use-component-context'
  import { useComponent } from './use-component.svelte'

  // Svelte 5 props with $bindable refs
  let { ref = $bindable(null), ...props }: ComponentRootProps = $props()

  // Split props for component logic
  const [useComponentProps, localProps] = $derived(
    createSplitProps<UseComponentProps>()(props, ['disabled', 'invalid', 'required']),
  )

  const providedId = $props.id()

  // Reactive machine props with $derived
  const machineProps = $derived.by(() => ({
    ...useComponentProps,
    id: useComponentProps.id ?? providedId,
  }))

  // Initialize component logic with Zag.js
  const component = useComponent(() => machineProps)
  const mergedProps = $derived(mergeProps(component().getRootProps(), localProps))

  // Provide context for child components
  ComponentProvider(component)

  // Function for @attach directive
  function setNode(node: Element | null) {
    component().setRootRef(node)
  }
</script>

<!-- Ark component with bind:ref and @attach -->
<Ark as="div" bind:ref {...mergedProps} {@attach setNode} />
```

### Svelte 5 Specific Patterns

**Props and Refs:**

- `let { ref = $bindable(null), ...props }: ComponentProps = $props()` - Svelte 5 props destructuring with bindable refs
- `$bindable()` - Makes props bindable to parent components
- `ref` defaults to `null` and is automatically typed

**Reactivity:**

- `$derived()` - Create derived reactive values
- `$derived.by()` - Create derived values with explicit dependencies
- Replaces Svelte 4's `$:` reactive statements for complex derivations

**Ark Component:**

- `<Ark as="div" />` - Polymorphic component factory
- `bind:ref` - Bind template ref to variable (works with $bindable)
- `{...mergedProps}` - Spread Zag.js props
- `{@attach setNode}` - Attach additional refs for complex components

**Context and State:**

- `createSplitProps()` - Utility to split component and DOM props
- `mergeProps()` - Merge Zag.js props with local props
- Provider pattern for compound components

## Framework-Specific Utilities

Each framework has specialized utilities for handling common component development patterns:

### Svelte Utilities

**createSplitProps()** - Prop separation utility:

```ts
const [useComponentProps, localProps] = $derived(
  createSplitProps<UseComponentProps>()(props, ['disabled', 'invalid', 'required']),
)
```

- Separates component logic props from DOM attributes
- First array contains props for Zag.js component logic
- Second array contains remaining props for DOM elements

**mergeProps()** - Zag.js integration:

```ts
import { mergeProps } from '@zag-js/svelte'
const mergedProps = $derived(mergeProps(component().getRootProps(), localProps))
```

- Combines Zag.js state props with local component props
- Handles prop precedence and conflicts automatically

### Vue Utilities

**BooleanDefaults Pattern** - Proper undefined handling:

```ts
const props = withDefaults(defineProps<ComponentProps>(), {
  disabled: undefined,
  invalid: undefined,
  required: undefined,
} satisfies BooleanDefaults<RootProps>)
```

- Prevents unwanted `false` values for boolean props
- Allows proper three-state handling (true/false/undefined)
- Essential for Zag.js boolean prop handling

**useForwardExpose()** - Advanced ref forwarding:

```ts
import { useForwardExpose } from '../../utils/use-forward-expose'
useForwardExpose()
```

- Handles complex ref forwarding scenarios
- Exposes component props and methods to parent
- Deals with Vue's text/comment node edge cases

### React/Solid Utilities

**Standard Patterns:**

- Direct ref forwarding with `forwardRef()`
- Context providers with standard React/Solid patterns
- Hook-based state management integration

### Shared Utilities

**Provider ID Generation:**

```ts
// Svelte
const providedId = $props.id()

// Vue
const props = defineProps<ComponentProps>()

// React/Solid
const id = props.id ?? generateId()
```

- Auto-generates unique IDs when not provided
- Ensures component instance uniqueness
- Framework-specific implementation patterns

## Type System Documentation

### Type Export Patterns

Each framework follows specific patterns for type exports to ensure consistency and proper TypeScript integration:

### Universal Type Patterns

**BaseProps vs Props:**

```ts
// BaseProps: Core component logic without framework-specific additions
export interface ComponentRootBaseProps extends UseComponentProps, PolymorphicProps {}

// Props: Complete interface including HTML attributes and framework-specific props
export interface ComponentRootProps extends ComponentRootBaseProps, HTMLAttributes<HTMLDivElement> {}
```

**Hook Types:**

```ts
// Input props for component hooks
export interface UseComponentProps {
  disabled?: boolean
  invalid?: boolean
  // ... component-specific props
}

// Return type from component hooks
export interface UseComponentReturn {
  getRootProps(): ComponentRootProps
  getControlProps(): ComponentControlProps
  // ... component-specific methods
}
```

### Framework-Specific Type Patterns

**React/Solid Type Structure:**

```ts
// Standard export pattern
export { ComponentRoot, type ComponentRootBaseProps, type ComponentRootProps } from './component-root'

// Hook integration
export interface ComponentRootProps extends ComponentRootBaseProps {
  ref?: RefObject<HTMLElement>
  children?: ReactNode
}
```

**Vue Type Structure:**

```ts
// Dedicated .types.ts file
export interface RootProps {
  disabled?: boolean
  invalid?: boolean
}

export type RootEmits = {
  'update:value': [value: string] // v-model integration
  valueChange: [details: ChangeDetails] // Callback pattern
}

// Component file extends from types
export interface ComponentRootBaseProps extends RootProps, PolymorphicProps {}
export interface ComponentRootProps extends ComponentRootBaseProps, HTMLAttributes {}
export interface ComponentRootEmits extends RootEmits {}
```

**Svelte Type Structure:**

```ts
// Module script type definitions
export interface ComponentRootBaseProps extends UseComponentProps, PolymorphicProps<'div'>, RefAttribute {}
export interface ComponentRootProps extends Assign<HTMLProps<'div'>, ComponentRootBaseProps> {}

// Props with $bindable
let { ref = $bindable(null), disabled = undefined, ...props }: ComponentRootProps = $props()
```

### Type Generation for Documentation

**Website Type Files:**

```json
// Generated: src/content/types/{framework}/{component}.types.json
{
  "Root": {
    "props": {
      "disabled": {
        "type": "boolean",
        "isRequired": false,
        "description": "Indicates whether the component is disabled."
      }
    },
    "element": "HTMLDivElement"
  }
}
```

**Type Generation Process:**

1. TypeScript compiler extracts component prop types
2. Documentation generator processes extracted types
3. JSON files generated for each framework
4. Website consumes JSON for API reference sections

### Polymorphic Type Patterns

**asChild Implementation:**

```ts
// Universal polymorphic props
export interface PolymorphicProps<T = 'div'> {
  asChild?: boolean
  as?: T
}

// Framework-specific extensions
// React: Uses Slot pattern
// Vue: Uses dynamic component
// Svelte: Uses component factory
// Solid: Uses Dynamic component
```

### Emit vs Callback Type Patterns

**Vue Emit Types:**

```ts
export type ComponentEmits = {
  // v-model integration (kebab-case)
  'update:value': [value: string]
  'update:checked': [checked: boolean]

  // Event callbacks (camelCase)
  valueChange: [details: ValueChangeDetails]
  checkedChange: [details: CheckedChangeDetails]
}
```

**Other Frameworks Callback Types:**

```ts
export interface ComponentProps {
  // Standard callback pattern
  onValueChange?: (details: ValueChangeDetails) => void
  onCheckedChange?: (details: CheckedChangeDetails) => void

  // Controlled props
  value?: string
  checked?: boolean
}
```

### Type Safety Best Practices

**Strict Type Checking:**

```ts
// Avoid any types - use proper generics
interface ComponentProps<T = string> {
  value?: T
  onValueChange?: (value: T) => void
}
```

**Framework Type Utilities:**

```ts
// Vue: BooleanDefaults for proper undefined handling
satisfies BooleanDefaults<RootProps>

// Svelte: Assign utility for prop merging
Assign<HTMLProps<'div'>, ComponentProps>

// React/Solid: Standard intersection types
ComponentProps & HTMLAttributes<HTMLDivElement>
```

**Usage Patterns:**

```tsx
// Direct imports
import { FieldRoot, FieldLabel } from '@ark-ui/react/field'

// Namespace imports (preferred)
import { Field } from '@ark-ui/react/field'
// Usage: <Field.Root><Field.Label /></Field.Root>
```
