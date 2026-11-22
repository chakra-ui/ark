import { createElement, ChevronRight } from 'lucide'

import '@ark-ui/web/collapsible'

import styles from 'styles/collapsible.module.css'

const paragraphs = [
  'Ark UI is a headless component library for building accessible, high-quality UI components for React, Solid, Vue, and Svelte. It provides unstyled, fully accessible components that you can customize to match your design system.',
  'Built on top of Zag.js state machines, Ark UI ensures consistent behavior across all frameworks while giving you complete control over styling. Each component follows WAI-ARIA patterns for accessibility out of the box.',
  "Whether you're building a design system from scratch or need reliable primitives for your next project, Ark UI provides the foundation you need without imposing any visual constraints.",
]

export function mount(root: HTMLElement) {
  root.innerHTML = /* html */ `
    <ark-collapsible class="${styles.Root}" collapsed-height="100">
      <ark-collapsible-trigger>
        <button class="${styles.Trigger}">
          Read More
          <ark-collapsible-indicator class="${styles.Indicator}">${createElement(ChevronRight, { 'aria-hidden': 'true' }).outerHTML}</ark-collapsible-indicator>
        </button>
      </ark-collapsible-trigger>
      <ark-collapsible-content class="${styles.Content}">
        <div class="${styles.Body}">
          ${paragraphs.map((text) => /* html */ `<p>${text}</p>`).join('')}
        </div>
      </ark-collapsible-content>
    </ark-collapsible>`
}
