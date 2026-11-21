import { createElement, X } from 'lucide'

import '@ark-ui/web/dialog'

import button from 'styles/button.module.css'
import styles from 'styles/dialog.module.css'

export function mount(root: HTMLElement) {
  root.innerHTML = /* html */ `
  <ark-dialog id="portal-dialog">
    <ark-dialog-trigger><button class="${button.Root}">Open Dialog</button></ark-dialog-trigger>
  </ark-dialog>

  <div class="portal">
    <ark-dialog-backdrop for="portal-dialog" class="${styles.Backdrop}"></ark-dialog-backdrop>
    <ark-dialog-positioner for="portal-dialog" class="${styles.Positioner}">
      <ark-dialog-content class="${styles.Content}">
        <ark-dialog-close-trigger><button class="${styles.CloseTrigger}">${createElement(X, { 'aria-hidden': 'true' }).outerHTML}</button></ark-dialog-close-trigger>
        <ark-dialog-title class="${styles.Title}">Portalled Dialog</ark-dialog-title>
        <ark-dialog-description class="${styles.Description}">This content lives outside its dialog root.</ark-dialog-description>
        <button class="${button.Root}">Confirm</button>
      </ark-dialog-content>
    </ark-dialog-positioner>
  </div>
`
}
