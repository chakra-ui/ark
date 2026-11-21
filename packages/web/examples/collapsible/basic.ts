import { createElement, ChevronRight } from 'lucide'

import '../../src/components/collapsible/index.js'

import styles from 'styles/collapsible.module.css'

export function mount(root: HTMLElement) {
  root.innerHTML = /* html */ `
  <ark-collapsible class="${styles.Root}" >
    
  <ark-collapsible-trigger>
    <button class="${styles.Trigger}">
      What is Ark UI?
      <ark-collapsible-indicator class="${styles.Indicator}">${createElement(ChevronRight, { 'aria-hidden': 'true' }).outerHTML}</ark-collapsible-indicator>
    </button>
  </ark-collapsible-trigger>
    <ark-collapsible-content class="${styles.Content}"><div class="${styles.Body}">Ark UI is a headless component library for building accessible, high-quality UI components for React, Solid, Vue, and Svelte.</div></ark-collapsible-content>
  </ark-collapsible>`
}
