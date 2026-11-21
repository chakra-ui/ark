import { createElement, X } from 'lucide'

import '@ark-ui/web/popover'

import button from 'styles/button.module.css'

import styles from 'styles/popover.module.css'

export function mount(root: HTMLElement) {
  root.innerHTML = /* html */ `
  <ark-popover same-width>
    <ark-popover-trigger><button class="${button.Root}" style="min-width: 200px">Click Me</button></ark-popover-trigger>
    <ark-popover-positioner class="${styles.Positioner}">
      <ark-popover-content class="${styles.Content}">
        <ark-popover-close-trigger><button class="${styles.CloseTrigger}">${createElement(X, { 'aria-hidden': 'true' }).outerHTML}</button></ark-popover-close-trigger>
        <ark-popover-title class="${styles.Title}">Matched Width</ark-popover-title>
        <ark-popover-description class="${styles.Description}">This popover matches the width of its trigger element.</ark-popover-description>
      </ark-popover-content>
    </ark-popover-positioner>
  </ark-popover>`
}
