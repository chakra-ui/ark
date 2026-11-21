import { createElement, X } from 'lucide'

import '../../src/components/dialog/index.js'

import '../../src/components/popover/index.js'

import button from 'styles/button.module.css'

import dialog from 'styles/dialog.module.css'

import styles from 'styles/popover.module.css'

export function mount(root: HTMLElement) {
  root.innerHTML = /* html */ `
  <ark-dialog>
    <ark-dialog-trigger><button class="${button.Root}">Open Dialog</button></ark-dialog-trigger>
    <ark-dialog-backdrop class="${dialog.Backdrop}"></ark-dialog-backdrop>
    <ark-dialog-positioner class="${dialog.Positioner}">
      <ark-dialog-content class="${dialog.Content}">
        <ark-dialog-close-trigger><button class="${dialog.CloseTrigger}">${createElement(X, { 'aria-hidden': 'true' }).outerHTML}</button></ark-dialog-close-trigger>
        <ark-dialog-title class="${dialog.Title}">Edit Profile</ark-dialog-title>
        <ark-dialog-description class="${dialog.Description}">Update your profile information below.</ark-dialog-description>
        <div class="${dialog.Body}">
          <ark-popover unmount-on-exit>
            <ark-popover-trigger><button class="${button.Root}">More Options</button></ark-popover-trigger>
            <ark-popover-positioner class="${styles.Positioner}">
              <ark-popover-content class="${styles.Content}">
                <template>
                  <ark-popover-arrow class="${styles.Arrow}"><ark-popover-arrow-tip class="${styles.ArrowTip}"></ark-popover-arrow-tip></ark-popover-arrow>
                  <ark-popover-close-trigger><button class="${styles.CloseTrigger}">${createElement(X, { 'aria-hidden': 'true' }).outerHTML}</button></ark-popover-close-trigger>
                  <ark-popover-title class="${styles.Title}">Additional Settings</ark-popover-title>
                  <ark-popover-description class="${styles.Description}">This popover renders correctly above the dialog.</ark-popover-description>
                </template>
              </ark-popover-content>
            </ark-popover-positioner>
          </ark-popover>
        </div>
      </ark-dialog-content>
    </ark-dialog-positioner>
  </ark-dialog>`
}
