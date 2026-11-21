import { createElement, X } from 'lucide'

import '@ark-ui/web/dialog'

import styles from 'styles/dialog.module.css'

import button from 'styles/button.module.css'

import field from 'styles/field.module.css'

export function mount(root: HTMLElement) {
  root.innerHTML = /* html */ `
  <ark-dialog initial-focus="#dialog-initial-focus">
    <ark-dialog-trigger><button class="${button.Root}">Open Dialog</button></ark-dialog-trigger>
    <ark-dialog-backdrop class="${styles.Backdrop}"></ark-dialog-backdrop>
    <ark-dialog-positioner class="${styles.Positioner}">
      <ark-dialog-content class="${styles.Content}">
        <ark-dialog-close-trigger><button class="${styles.CloseTrigger}">${createElement(X, { 'aria-hidden': 'true' }).outerHTML}</button></ark-dialog-close-trigger>
        <ark-dialog-title class="${styles.Title}">Edit Profile</ark-dialog-title>
        <ark-dialog-description class="${styles.Description}">The first input will be focused when the dialog opens.</ark-dialog-description>
        <div class="${styles.Body}">
          <input id="dialog-initial-focus" class="${field.Input}" placeholder="Enter your name..." />
          <input class="${field.Input}" placeholder="Enter your email..." />
        </div>
      </ark-dialog-content>
    </ark-dialog-positioner>
  </ark-dialog>`
}
