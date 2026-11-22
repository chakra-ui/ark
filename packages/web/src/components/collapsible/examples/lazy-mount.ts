import { createElement, ChevronRight } from 'lucide'

import '@ark-ui/web/collapsible'

import styles from 'styles/collapsible.module.css'

export function mount(root: HTMLElement) {
  root.innerHTML = /* html */ `
    <ark-collapsible class="${styles.Root}" unmount-on-exit>
      <ark-collapsible-trigger>
        <button class="${styles.Trigger}">
          What is Ark UI?
          <ark-collapsible-indicator class="${styles.Indicator}">${createElement(ChevronRight, { 'aria-hidden': 'true' }).outerHTML}</ark-collapsible-indicator>
        </button>
      </ark-collapsible-trigger>
      <ark-collapsible-content class="${styles.Content}"><template><div class="${styles.Body}">Ark UI is a headless component library for building accessible, high-quality UI components for React, Solid, Vue, and Svelte.</div></template></ark-collapsible-content>
    </ark-collapsible>`
}
