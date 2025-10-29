# Ark UI - Documentation Patterns

This guide covers patterns for writing component documentation in the Ark UI website.

## Documentation Structure

Component documentation is located in `website/src/content/pages/components/` with this standard structure:

```markdown
---
id: component-name
title: Component Name
description: Brief description
---

<ComponentPreview id="ComponentName" />

## Anatomy

<Anatomy id="component-name" />

## Examples

<Example id="basic" />

### Feature Example

Description of what this demonstrates.

<Example id="example-name" />

## Guides (if applicable)

### Advanced Pattern

Non-interactive guides with code snippets.

## API Reference

### Props

<ComponentTypes id="component-name" />

### Context

<ContextType id="component-name" />

## Accessibility (if applicable)

<KeyBindingsTable id="component-name" />
```

## Key Principles

### Examples vs Guides

**Examples Section** - Interactive demos with `<Example id="..." />`:
- Show component behavior through working demos
- Framework-agnostic (shown for all frameworks via tabs)
- Each example has a brief description

**Guides Section** - Non-interactive implementation guidance:
- CSS styling patterns and animations
- Integration guides (Next.js, Remix, router setup)
- Advanced configuration and type safety patterns
- Performance optimizations

### When to Use Guides Instead of Examples

Move content to Guides if it contains:

1. **CSS code blocks** - Animation keyframes, styling patterns, CSS variables
2. **Router integration** - Framework-specific router setup
3. **Framework integration** - Next.js Image, dynamic imports
4. **Prop explanations** - Code snippets without interactive behavior
5. **Advanced patterns** - Type safety, custom object mapping
6. **Styling requirements** - Required CSS or structural requirements

## Common Patterns

### Root Provider

```markdown
### Root Provider

The `useComponentName` hook gives you programmatic access to the component's state and methods.

<Example id="root-provider" />

> If you're using the `RootProvider` component, you don't need to use the `Root` component.
```

### Field Integration

```markdown
### Field

The `Field` component helps manage form-related state and accessibility attributes.

<Example id="with-field" />
```

### Controlled State

```markdown
### Controlled State

To create a controlled component, manage the state using the `value` and `onValueChange` props:

<Example id="controlled" />
```

## Guide Section Patterns

### CSS Variables

```markdown
### Available height and width

The following CSS variables are exposed to the `Component.Positioner`:

\`\`\`css
--reference-width: <pixel-value>;
--available-width: <pixel-value>;
--available-height: <pixel-value>;
\`\`\`
```

### CSS Animations

```markdown
### Animate Content Size

Use the `--height` CSS variable to animate content:

\`\`\`css
@keyframes slideDown {
  to { height: var(--height); }
}
\`\`\`
```

### Framework Integration

```markdown
### Next.js Image Integration

Here's an example using `next/image`:

\`\`\`tsx
import { Component } from '@ark-ui/react/component'
import { getImageProps } from 'next/image'
// ...
\`\`\`
```

### Router Integration

```markdown
### Router Controlled Tabs

Control active state based on URL:

- Set `value` prop to current URL path
- Listen to `onValueChange` and update URL

\`\`\`tsx
// Remix Router example
\`\`\`
```

## Formatting

### Code Blocks

Specify language for syntax highlighting:

```markdown
\`\`\`tsx
// TypeScript code
\`\`\`

\`\`\`css
/* CSS code */
\`\`\`
```

### Notes and Warnings

```markdown
> Note: This requires rendering the component within a `Portal`.

> If you're using the `RootProvider` component, you don't need to use the `Root` component.
```

### Keyboard Keys

```markdown
Press <kbd>Enter</kbd> or <kbd>Escape</kbd> to close.
```

## Example Naming Conventions

Use kebab-case, descriptive IDs:

- `basic` - Simple usage
- `controlled` - Controlled state
- `root-provider` - RootProvider usage
- `with-field` - Field integration
- `lazy-mount` - Lazy mounting
- `initial-focus` - Focus control
- `links` - Rendering as links

## Documentation Checklist

- [ ] Frontmatter includes id, title, description
- [ ] ComponentPreview at top
- [ ] Anatomy section present
- [ ] Examples start with basic
- [ ] Example IDs match example filenames (kebab-case)
- [ ] Guides contain non-interactive content only
- [ ] API Reference includes ComponentTypes and ContextType
- [ ] Accessibility section if applicable
- [ ] Examples ordered simple to complex

## Common Mistakes

❌ Don't include CSS examples in Examples section
✅ Move CSS examples to Guides

❌ Don't include router integration in Examples
✅ Move integration guides to Guides

❌ Don't write generic descriptions
✅ Write specific descriptions explaining props/features

❌ Don't use code blocks without `<Example>` tags in Examples
✅ Use `<Example>` tags or move to Guides

## Adding to Showcase

Add projects/design systems built with Ark UI to `website/src/content/showcases.json`:

1. **Get image** (1200x630 dimensions):
   - Download OG image: `curl -sL "<og-image-url>" -o website/public/images/<name>.png`
   - Or capture screenshot with Playwright using `networkidle` and `viewport: { width: 1200, height: 630 }`

2. **Add entry** to `showcases.json`:
   ```json
   {
     "title": "Project Name",
     "description": "Brief description (50-60 chars)",
     "url": "https://project.com/",
     "image": "/images/<name>.png"
   }
   ```

3. **Clean up** temp files in `/tmp` if created

## File References

```
website/src/content/pages/components/{component}.mdx  - Documentation
packages/react/src/components/{component}/examples/   - React examples
packages/solid/src/components/{component}/examples/   - Solid examples
packages/vue/src/components/{component}/examples/     - Vue examples
packages/svelte/src/lib/components/{component}/examples/ - Svelte examples
website/src/content/showcases.json                    - Showcase entries
website/public/images/                                - Showcase images
```
