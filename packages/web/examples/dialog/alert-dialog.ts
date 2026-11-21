import '@ark-ui/web/dialog'

import styles from 'styles/dialog.module.css'

import button from 'styles/button.module.css'

export function mount(root: HTMLElement) {
  root.innerHTML = /* html */ `
  <ark-dialog role="alertdialog">
    <ark-dialog-trigger><button class="${button.Root}">Delete Account</button></ark-dialog-trigger>
    <ark-dialog-backdrop class="${styles.Backdrop}"></ark-dialog-backdrop>
    <ark-dialog-positioner class="${styles.Positioner}">
      <ark-dialog-content class="${styles.Content}">
        <ark-dialog-title class="${styles.Title}">Are you absolutely sure?</ark-dialog-title>
        <ark-dialog-description class="${styles.Description}">This action cannot be undone. This will permanently delete your account and remove your data from our servers.</ark-dialog-description>
        <div class="${styles.Actions}">
          <ark-dialog-close-trigger><button class="${button.Root}">Cancel</button></ark-dialog-close-trigger>
          <button class="${button.Root}" data-variant="solid">Delete Account</button>
        </div>
      </ark-dialog-content>
    </ark-dialog-positioner>
  </ark-dialog>`
}
