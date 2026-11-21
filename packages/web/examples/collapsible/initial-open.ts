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

const about = /* html */ `<div class="${styles.Body}">Ark UI is a headless component library for building accessible, high-quality UI components for React, Solid, Vue, and Svelte.</div>`

export function mount(root: HTMLElement) {
  root.innerHTML = collapsible('default-open', 'What is Ark UI?', about)
}
