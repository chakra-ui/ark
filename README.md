<br />
<p align="center">
  <a href="https://ark-ui.com">
    <img src="https://ark-ui.com/images/ark-logo-on-brand.svg" alt="Ark UI" height="64" />
  </a>
</p>

<p align="center">
  <strong>Build scalable design systems with unstyled, accessible UI components</strong>
</p>

<p align="center">
  <a href="https://github.com/chakra-ui/ark/blob/main/LICENSE"><img src="https://img.shields.io/npm/l/@ark-ui/react?style=for-the-badge" alt="MIT License" /></a>
  <a href="https://www.npmjs.com/package/@ark-ui/react"><img src="https://img.shields.io/npm/dm/@ark-ui/react?style=for-the-badge" alt="npm downloads" /></a>
  <a href="https://github.com/chakra-ui/ark/"><img src="https://img.shields.io/github/stars/chakra-ui/ark?logo=github&style=for-the-badge" alt="GitHub stars" /></a>
  <a href="https://discord.gg/ww6HE5xaZ2"><img src="https://img.shields.io/discord/660863154703695893?label=discord&logo=discord&style=for-the-badge" alt="Discord" /></a>
</p>

<p align="center">
  <a href="https://ark-ui.com">Documentation</a> •
  <a href="#installation">Installation</a> •
  <a href="#features">Features</a> •
  <a href="#components">Components</a> •
  <a href="https://ark-ui.canny.io/">Roadmap</a> •
  <a href="CONTRIBUTING.md">Contributing</a>
</p>

<br />

## Overview

Ark UI is a headless component library that provides the foundation for building high-quality, accessible design systems
and web applications. Built on top of [Zag.js](https://zagjs.com) state machines, Ark UI delivers robust,
framework-agnostic component logic with perfect parity across **React**, **Solid**, **Vue**, and **Svelte**.

### Why Ark UI?

- **🎨 Completely Unstyled** - Zero styling opinions. Bring your own styles with CSS-in-JS, Tailwind, vanilla CSS, or
  any styling solution
- **♿️ Accessibility First** - WCAG compliant components tested with real assistive technologies out of the box
- **🔄 State Machine Powered** - Predictable, testable behavior powered by Zag.js finite state machines
- **🌍 Multi-Framework** - Same API across React, Solid, Vue, and Svelte - write once, use everywhere
- **📦 Truly Composable** - Granular component primitives that work together seamlessly
- **⚡️ Production Ready** - Battle-tested in products like Chakra UI, used by teams at OVHCloud, PluralSight, and more
- **🎯 Type-Safe** - Fully typed with TypeScript for exceptional developer experience

## Installation

Choose your framework and install the corresponding package:

```bash
# React
npm install @ark-ui/react

# Solid
npm install @ark-ui/solid

# Vue
npm install @ark-ui/vue

# Svelte
npm install @ark-ui/svelte
```

## Quick Start

Here's a simple example showing how consistent the API is across frameworks:

### React

```tsx
import { Dialog } from '@ark-ui/react/dialog'

export const MyDialog = () => (
  <Dialog.Root>
    <Dialog.Trigger>Open Dialog</Dialog.Trigger>
    <Dialog.Backdrop />
    <Dialog.Positioner>
      <Dialog.Content>
        <Dialog.Title>Dialog Title</Dialog.Title>
        <Dialog.Description>Dialog description</Dialog.Description>
        <Dialog.CloseTrigger>Close</Dialog.CloseTrigger>
      </Dialog.Content>
    </Dialog.Positioner>
  </Dialog.Root>
)
```

### Vue

```vue
<script setup lang="ts">
import { Dialog } from '@ark-ui/vue/dialog'
</script>

<template>
  <Dialog.Root>
    <Dialog.Trigger>Open Dialog</Dialog.Trigger>
    <Dialog.Backdrop />
    <Dialog.Positioner>
      <Dialog.Content>
        <Dialog.Title>Dialog Title</Dialog.Title>
        <Dialog.Description>Dialog description</Dialog.Description>
        <Dialog.CloseTrigger>Close</Dialog.CloseTrigger>
      </Dialog.Content>
    </Dialog.Positioner>
  </Dialog.Root>
</template>
```

### Solid

```tsx
import { Dialog } from '@ark-ui/solid/dialog'

export const MyDialog = () => (
  <Dialog.Root>
    <Dialog.Trigger>Open Dialog</Dialog.Trigger>
    <Dialog.Backdrop />
    <Dialog.Positioner>
      <Dialog.Content>
        <Dialog.Title>Dialog Title</Dialog.Title>
        <Dialog.Description>Dialog description</Dialog.Description>
        <Dialog.CloseTrigger>Close</Dialog.CloseTrigger>
      </Dialog.Content>
    </Dialog.Positioner>
  </Dialog.Root>
)
```

### Svelte

```svelte
<script lang="ts">
  import { Dialog } from '@ark-ui/svelte/dialog'
</script>

<Dialog.Root>
  <Dialog.Trigger>Open Dialog</Dialog.Trigger>
  <Dialog.Backdrop />
  <Dialog.Positioner>
    <Dialog.Content>
      <Dialog.Title>Dialog Title</Dialog.Title>
      <Dialog.Description>Dialog description</Dialog.Description>
      <Dialog.CloseTrigger>Close</Dialog.CloseTrigger>
    </Dialog.Content>
  </Dialog.Positioner>
</Dialog.Root>
```

## Features

### Zero-Styling Freedom

Every component is completely unstyled, giving you total control over your design. Use any styling solution:

```tsx
// Tailwind CSS
<Dialog.Trigger className="px-4 py-2 bg-blue-500 rounded">Open</Dialog.Trigger>

// CSS-in-JS
<Dialog.Trigger css={{ padding: '8px 16px', background: 'blue' }}>Open</Dialog.Trigger>

// Vanilla CSS
<Dialog.Trigger className="my-button">Open</Dialog.Trigger>
```

### Accessibility Built-In

All components follow WAI-ARIA design patterns and are tested with screen readers:

- ✅ Proper ARIA attributes and roles
- ✅ Keyboard navigation support
- ✅ Focus management
- ✅ Screen reader announcements
- ✅ RTL support

### State Machine Architecture

Powered by Zag.js, each component uses finite state machines for predictable behavior:

- 🔒 Type-safe state transitions
- 🧪 Easier to test and debug
- 🐛 Fewer edge cases and bugs
- 📊 Visualizable component logic

### Framework Parity

Maintain a single design system across multiple frameworks without rewriting component logic:

```tsx
// Same API, same behavior, different frameworks
const packages = ['@ark-ui/react', '@ark-ui/solid', '@ark-ui/vue', '@ark-ui/svelte']
```

## Components

Ark UI provides **45+ production-ready components** covering common UI patterns:

### Layout & Navigation

- Accordion
- Tabs
- Splitter
- Steps
- Tree View
- Tour

### Overlays & Dialogs

- Dialog
- Popover
- Tooltip
- Hover Card
- Bottom Sheet
- Floating Panel

### Forms & Inputs

- Checkbox
- Radio Group
- Select
- Combobox
- Number Input
- Pin Input
- Tags Input
- Editable
- File Upload
- Color Picker
- Date Picker
- Password Input
- Signature Pad
- Slider
- Angle Slider
- Rating Group
- Switch
- Toggle / Toggle Group

### Data Display

- Avatar
- Highlight
- Progress
- QR Code
- Format
- JSON Tree View
- Marquee

### Utilities

- Carousel
- Clipboard
- Collapsible
- Field / Fieldset
- Menu
- Pagination
- Portal
- Presence
- Scroll Area
- Segment Group
- Timer
- Toast
- Client Only
- Download Trigger
- Focus Trap
- Frame
- Collection
- Listbox

[View all components →](https://ark-ui.com/docs/overview/introduction)

## Documentation

Visit [ark-ui.com](https://ark-ui.com) for:

- 📖 Comprehensive guides and tutorials
- 📚 Detailed API references for each component
- 💡 Interactive examples and recipes
- 🎓 Styling guides for popular frameworks
- 🔧 TypeScript usage patterns

## Ecosystem

### Built with Ark UI

- **[Chakra UI v3](https://chakra-ui.com)** - A simple, modular component library
- **[Park UI](https://park-ui.com)** - Beautifully designed components built with Ark UI and Panda CSS
- **[Tark UI](https://www.tarkui.xyz/)** - Ark UI components styled with Tailwind CSS

### Styling Libraries

Ark UI works seamlessly with:

- [Panda CSS](https://panda-css.com)
- [Tailwind CSS](https://tailwindcss.com)
- [Styled Components](https://styled-components.com)
- [Emotion](https://emotion.sh)
- Vanilla CSS, CSS Modules, and more

### Developer Tools

- **[MCP Server](https://github.com/chakra-ui/ark-mcp)** - AI-assisted development with Claude and other AI agents

## Community

- 💬 [Discord](https://discord.gg/ww6HE5xaZ2) - Join our community for help and discussions
- 🐦 [Twitter](https://twitter.com/ark_ui_) - Follow us for updates and announcements
- 🗺️ [Roadmap](https://ark-ui.canny.io/) - Request features and vote on upcoming work
- 📝 [Blog](https://ark-ui.com/blog) - Read about releases and technical deep dives

## Contributing

We welcome contributions! Please read our [Contributing Guide](CONTRIBUTING.md) to learn about:

- Setting up your development environment
- Our development workflow
- Code conventions and standards
- How to submit pull requests

## Support

- 📚 Check our [documentation](https://ark-ui.com)
- 💬 Ask questions on [Discord](https://discord.gg/ww6HE5xaZ2)
- 🐛 Report bugs via [GitHub Issues](https://github.com/chakra-ui/ark/issues)
- 💡 Request features on our [Roadmap](https://ark-ui.canny.io/)

## Sponsors

Ark UI is maintained by [Christian Schröter](https://github.com/cschroeter), [Segun Adebayo](https://github.com/segunadebayo), and the Chakra UI team.
Development is supported by our amazing sponsors:

[Become a sponsor →](https://opencollective.com/chakra-ui)

## License

MIT © [Chakra Systems Inc.](https://github.com/chakra-ui)

---

<p align="center">
  Made with ❤️ by the <a href="https://github.com/chakra-ui/ark/graphs/contributors">Ark UI Community</a>
</p>
