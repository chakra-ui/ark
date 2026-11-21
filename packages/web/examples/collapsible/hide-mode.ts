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
  root.innerHTML = /* html */ `
  <div class="stack">
    <p style="margin: 0">Collapse both panels, then search the page for "find me". Only <code>hidden-until-found</code> reveals its content.</p>
    ${collapsible('default-open', 'hidden', /* html */ `<div class="${styles.Body}">Hidden content: find me in the default panel.</div>`)}
    ${collapsible('default-open hidden-until-found', 'hidden-until-found', /* html */ `<div class="${styles.Body}">Hidden content: find me in the until-found panel.</div>`)}
  </div>`
}
