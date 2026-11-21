import { createElement, X } from 'lucide'

import '@ark-ui/web/dialog'

import button from 'styles/button.module.css'

import styles from 'styles/dialog.module.css'

export function mount(root: HTMLElement) {
  root.innerHTML = /* html */ `
  <ark-dialog modal="false">
    <ark-dialog-trigger><button class="${button.Root}">Open Non-Modal Dialog</button></ark-dialog-trigger>
    <ark-dialog-positioner class="${styles.Positioner}">
      <ark-dialog-content class="${styles.Content}">
        <ark-dialog-close-trigger><button class="${styles.CloseTrigger}">${createElement(X, { 'aria-hidden': 'true' }).outerHTML}</button></ark-dialog-close-trigger>
        <ark-dialog-title class="${styles.Title}">Non-Modal Dialog</ark-dialog-title>
        <ark-dialog-description class="${styles.Description}">This dialog allows interaction with elements outside. You can click buttons, select text, and interact with the page behind it.</ark-dialog-description>
      </ark-dialog-content>
    </ark-dialog-positioner>
  </ark-dialog>`
}
