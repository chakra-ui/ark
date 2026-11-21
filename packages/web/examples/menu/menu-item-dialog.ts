import { createElement, ChevronDown, X } from 'lucide'

import '@ark-ui/web/dialog'

import '@ark-ui/web/menu'

import styles from 'styles/menu.module.css'

import dialog from 'styles/dialog.module.css'

import button from 'styles/button.module.css'

const item = ({ value, label }: { value: string; label: string }) =>
  /* html */ `<ark-menu-item class="${styles.Item}" value="${value}">${label}</ark-menu-item>`

export function mount(root: HTMLElement) {
  root.innerHTML = /* html */ `
    <ark-menu>
      <ark-menu-trigger>
        <button class="${styles.Trigger}">
          Actions
          <ark-menu-indicator class="${styles.Indicator}">${createElement(ChevronDown, { 'aria-hidden': 'true' }).outerHTML}</ark-menu-indicator>
        </button>
      </ark-menu-trigger>
      <ark-menu-positioner class="${styles.Positioner}">
        <ark-menu-content class="${styles.Content}">
          <ark-menu-list class="${styles.List}">
            ${item({ value: 'edit', label: 'Edit' })}
            ${item({ value: 'duplicate', label: 'Duplicate' })}
            <ark-menu-separator class="${styles.Separator}"></ark-menu-separator>
            ${item({ value: 'delete', label: 'Delete...' })}
          </ark-menu-list>
        </ark-menu-content>
      </ark-menu-positioner>
    </ark-menu>
    <ark-dialog role="alertdialog">
      <ark-dialog-backdrop class="${dialog.Backdrop}"></ark-dialog-backdrop>
      <ark-dialog-positioner class="${dialog.Positioner}">
        <ark-dialog-content class="${dialog.Content}">
          <ark-dialog-title class="${dialog.Title}">Confirm Delete</ark-dialog-title>
          <ark-dialog-description class="${dialog.Description}">Are you sure you want to delete this item? This action cannot be undone.</ark-dialog-description>
          <ark-dialog-close-trigger><button class="${dialog.CloseTrigger}">${createElement(X, { 'aria-hidden': 'true' }).outerHTML}</button></ark-dialog-close-trigger>
          <div class="${dialog.Actions}">
            <button class="${button.Root}" data-close>Cancel</button>
            <button class="${button.Root}" data-variant="solid" data-close>Delete</button>
          </div>
        </ark-dialog-content>
      </ark-dialog-positioner>
    </ark-dialog>`
  const dialogEl = root.querySelector('ark-dialog')!
  root.querySelector('ark-menu')!.addEventListener('itemselect', (event) => {
    if (event.detail.value === 'delete') dialogEl.api?.setOpen(true)
  })
  for (const close of root.querySelectorAll('[data-close]'))
    close.addEventListener('click', () => dialogEl.api?.setOpen(false))
}
