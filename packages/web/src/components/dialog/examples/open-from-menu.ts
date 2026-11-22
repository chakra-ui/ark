import { createElement, ChevronDown, X } from 'lucide'

import '@ark-ui/web/dialog'

import '@ark-ui/web/menu'

import menu from 'styles/menu.module.css'

import styles from 'styles/dialog.module.css'

export function mount(root: HTMLElement) {
  root.innerHTML = /* html */ `
    <ark-menu>
      <ark-menu-trigger>
        <button class="${menu.Trigger}">Actions<ark-menu-indicator class="${menu.Indicator}">${createElement(ChevronDown, { 'aria-hidden': 'true' }).outerHTML}</ark-menu-indicator></button>
      </ark-menu-trigger>
      <ark-menu-positioner class="${menu.Positioner}">
        <ark-menu-content class="${menu.Content}">
          <ark-menu-list class="${menu.List}">
            <ark-menu-item class="${menu.Item}" value="edit">Edit</ark-menu-item>
            <ark-menu-item class="${menu.Item}" value="duplicate">Duplicate</ark-menu-item>
            <ark-menu-separator class="${menu.Separator}"></ark-menu-separator>
            <ark-menu-item class="${menu.Item}" value="delete">Delete...</ark-menu-item>
          </ark-menu-list>
        </ark-menu-content>
      </ark-menu-positioner>
    </ark-menu>
    
  <ark-dialog open="false" role="alertdialog">
    
    <ark-dialog-backdrop class="${styles.Backdrop}"></ark-dialog-backdrop>
    <ark-dialog-positioner class="${styles.Positioner}">
      <ark-dialog-content class="${styles.Content}" >
  <ark-dialog-title class="${styles.Title}">Confirm Delete</ark-dialog-title>
  <ark-dialog-description class="${styles.Description}">Are you sure you want to delete this item? This action cannot be undone.</ark-dialog-description><ark-dialog-close-trigger><button class="${styles.CloseTrigger}">${createElement(X, { 'aria-hidden': 'true' }).outerHTML}</button></ark-dialog-close-trigger></ark-dialog-content>
    </ark-dialog-positioner>
  </ark-dialog>`
  const dialogEl = root.querySelector('ark-dialog')!
  root.querySelector('ark-menu')!.addEventListener('itemselect', (event) => {
    if (event.detail.value === 'delete') dialogEl.setAttribute('open', 'true')
  })
  dialogEl.addEventListener('openchange', (event) => {
    dialogEl.setAttribute('open', String(event.detail.open))
  })
}
