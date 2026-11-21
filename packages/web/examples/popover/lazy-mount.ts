import { createElement, X } from 'lucide'

import '../../src/components/popover/index.js'

import button from 'styles/button.module.css'

import styles from 'styles/popover.module.css'

export function mount(root: HTMLElement) {
  root.innerHTML = /* html */ `
  <ark-popover>
    <ark-popover-trigger><button class="${button.Root}">Click Me</button></ark-popover-trigger>
    <ark-popover-positioner class="${styles.Positioner}">
      <ark-popover-content class="${styles.Content}">
        <template>
        <ark-popover-close-trigger><button class="${styles.CloseTrigger}">${createElement(X, { 'aria-hidden': 'true' }).outerHTML}</button></ark-popover-close-trigger>
        <ark-popover-title class="${styles.Title}">Lazy Loaded</ark-popover-title>
        <ark-popover-description class="${styles.Description}">This content is only mounted when the popover opens.</ark-popover-description>
        </template>
      </ark-popover-content>
    </ark-popover-positioner>
  </ark-popover>`
}
