import { createElement, X } from 'lucide'

import '@ark-ui/web/dialog'

import button from 'styles/button.module.css'

import styles from 'styles/dialog.module.css'

export function mount(root: HTMLElement) {
  root.innerHTML = /* html */ `
  <div class="stack">
    <button class="${button.Root}" id="dialog-final-focus">I will receive focus when dialog closes</button>
    <ark-dialog final-focus="#dialog-final-focus">
      <ark-dialog-trigger><button class="${button.Root}">Open Dialog</button></ark-dialog-trigger>
      <ark-dialog-backdrop class="${styles.Backdrop}"></ark-dialog-backdrop>
      <ark-dialog-positioner class="${styles.Positioner}">
        <ark-dialog-content class="${styles.Content}">
          <ark-dialog-close-trigger><button class="${styles.CloseTrigger}">${createElement(X, { 'aria-hidden': 'true' }).outerHTML}</button></ark-dialog-close-trigger>
          <ark-dialog-title class="${styles.Title}">Focus Redirect</ark-dialog-title>
          <ark-dialog-description class="${styles.Description}">When this dialog closes, focus will return to the button above instead of the trigger.</ark-dialog-description>
        </ark-dialog-content>
      </ark-dialog-positioner>
    </ark-dialog>
  </div>`
}
