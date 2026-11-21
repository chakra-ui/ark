import { createElement, X } from 'lucide'

import '../../src/components/dialog/index.js'

import '../../src/components/tooltip/index.js'

import button from 'styles/button.module.css'

import styles from 'styles/tooltip.module.css'

import dialog from 'styles/dialog.module.css'

const tooltipPopup = (content: string) => /* html */ `
  <ark-tooltip-positioner class="${styles.Positioner}">
    <ark-tooltip-content class="${styles.Content}">${content}</ark-tooltip-content>
  </ark-tooltip-positioner>`

export function mount(root: HTMLElement) {
  root.innerHTML = /* html */ `
  <ark-dialog>
    <ark-tooltip>
      <ark-tooltip-trigger>
        <ark-dialog-trigger><button class="${button.Root}">Open Dialog</button></ark-dialog-trigger>
      </ark-tooltip-trigger>
      ${tooltipPopup('Opens a sign-in dialog')}
    </ark-tooltip>
    <ark-dialog-backdrop class="${dialog.Backdrop}"></ark-dialog-backdrop>
    <ark-dialog-positioner class="${dialog.Positioner}">
      <ark-dialog-content class="${dialog.Content}">
        <ark-dialog-close-trigger><button class="${dialog.CloseTrigger}">${createElement(X, { 'aria-hidden': 'true' }).outerHTML}</button></ark-dialog-close-trigger>
        <ark-dialog-title class="${dialog.Title}">Welcome Back</ark-dialog-title>
        <ark-dialog-description class="${dialog.Description}">Sign in to your account to continue.</ark-dialog-description>
      </ark-dialog-content>
    </ark-dialog-positioner>
  </ark-dialog>`
}
