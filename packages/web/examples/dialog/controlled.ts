import { createElement, X } from 'lucide'

import '@ark-ui/web/dialog'

import styles from 'styles/dialog.module.css'

import button from 'styles/button.module.css'

export function mount(root: HTMLElement) {
  root.innerHTML = /* html */ `
    <output>Open: false</output>
    
  <ark-dialog open="false">
    <ark-dialog-trigger><button class="${button.Root}">Open Dialog</button></ark-dialog-trigger>
    <ark-dialog-backdrop class="${styles.Backdrop}"></ark-dialog-backdrop>
    <ark-dialog-positioner class="${styles.Positioner}">
      <ark-dialog-content class="${styles.Content}" ><ark-dialog-close-trigger><button class="${styles.CloseTrigger}">${createElement(X, { 'aria-hidden': 'true' }).outerHTML}</button></ark-dialog-close-trigger>
  <ark-dialog-title class="${styles.Title}">Session Settings</ark-dialog-title>
  <ark-dialog-description class="${styles.Description}">Manage your session preferences and security options.</ark-dialog-description></ark-dialog-content>
    </ark-dialog-positioner>
  </ark-dialog>`
  const dialogEl = root.querySelector('ark-dialog')!
  dialogEl.addEventListener('openchange', (event) => {
    const { open } = event.detail
    dialogEl.setAttribute('open', String(open))
    root.querySelector('output')!.textContent = `Open: ${open}`
  })
}
