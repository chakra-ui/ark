import { createElement, ChevronRight } from 'lucide'

import '../../src/components/collapsible/index.js'

import styles from 'styles/collapsible.module.css'

const trigger = (label: string) => /* html */ `
  <ark-collapsible-trigger>
    <button class="${styles.Trigger}">
      ${label}
      <ark-collapsible-indicator class="${styles.Indicator}">${createElement(ChevronRight, { 'aria-hidden': 'true' }).outerHTML}</ark-collapsible-indicator>
    </button>
  </ark-collapsible-trigger>`

const collapsible = (attrs: string, label: string, body: string, className = styles.Root) => /* html */ `
  <ark-collapsible class="${className}" ${attrs}>
    ${trigger(label)}
    <ark-collapsible-content class="${styles.Content}">${body}</ark-collapsible-content>
  </ark-collapsible>`

export function mount(root: HTMLElement) {
  root.innerHTML = collapsible(
    `collapsed-height="100"`,
    'Read More',
    /* html */ `<div class="${styles.Body}">
      <p>Ark UI is a headless component library for building accessible, high-quality UI components for React, Solid, Vue, and Svelte. It provides unstyled, fully accessible components that you can customize to match your design system.</p>
      <p>Built on top of Zag.js state machines, Ark UI ensures consistent behavior across all frameworks while giving you complete control over styling. Each component follows WAI-ARIA patterns for accessibility out of the box.</p>
      <p>Whether you're building a design system from scratch or need reliable primitives for your next project, Ark UI provides the foundation you need without imposing any visual constraints.</p>
    </div>`,
  )
}
