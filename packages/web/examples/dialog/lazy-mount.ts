import { createElement, X } from 'lucide'

import '@ark-ui/web/dialog'

import button from 'styles/button.module.css'

import styles from 'styles/dialog.module.css'

export function mount(root: HTMLElement) {
  root.innerHTML = /* html */ `
  <ark-dialog unmount-on-exit>
    <ark-dialog-trigger><button class="${button.Root}">Open Dialog</button></ark-dialog-trigger>
    <ark-dialog-backdrop class="${styles.Backdrop}"></ark-dialog-backdrop>
    <ark-dialog-positioner class="${styles.Positioner}">
      <ark-dialog-content class="${styles.Content}">
        <template>
          <ark-dialog-close-trigger><button class="${styles.CloseTrigger}">${createElement(X, { 'aria-hidden': 'true' }).outerHTML}</button></ark-dialog-close-trigger>
          <ark-dialog-title class="${styles.Title}">Mounted on open</ark-dialog-title>
          <ark-dialog-description class="${styles.Description}">Removed again after the exit animation.</ark-dialog-description>
        </template>
      </ark-dialog-content>
    </ark-dialog-positioner>
  </ark-dialog>
`
}
