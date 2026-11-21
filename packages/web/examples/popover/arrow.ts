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
        <ark-popover-arrow class="${styles.Arrow}"><ark-popover-arrow-tip class="${styles.ArrowTip}"></ark-popover-arrow-tip></ark-popover-arrow>
        <ark-popover-close-trigger><button class="${styles.CloseTrigger}">${createElement(X, { 'aria-hidden': 'true' }).outerHTML}</button></ark-popover-close-trigger>
        <ark-popover-title class="${styles.Title}">Notifications</ark-popover-title>
        <ark-popover-description class="${styles.Description}">You have 3 unread messages in your inbox.</ark-popover-description>
      </ark-popover-content>
    </ark-popover-positioner>
  </ark-popover>`
}
