import { createElement, X } from 'lucide'

import '../../src/components/dialog/index.js'

import button from 'styles/button.module.css'

import styles from 'styles/dialog.module.css'

export function mount(root: HTMLElement) {
  root.innerHTML = /* html */ `
    <button class="${button.Root}" data-open>Open Dialog false</button>
    
  <ark-dialog open="false">
    
    <ark-dialog-backdrop class="${styles.Backdrop}"></ark-dialog-backdrop>
    <ark-dialog-positioner class="${styles.Positioner}">
      <ark-dialog-content class="${styles.Content}" ><ark-dialog-close-trigger><button class="${styles.CloseTrigger}">${createElement(X, { 'aria-hidden': 'true' }).outerHTML}</button></ark-dialog-close-trigger>
  <ark-dialog-title class="${styles.Title}">Rapid State Test</ark-dialog-title>
  <ark-dialog-description class="${styles.Description}">This dialog tests rapid state changes (true → false → true). If working correctly, the dialog should be open after clicking the button.</ark-dialog-description></ark-dialog-content>
    </ark-dialog-positioner>
  </ark-dialog>`
  const dialogEl = root.querySelector('ark-dialog')!
  const trigger = root.querySelector('[data-open]')!
  const setOpen = (open: boolean) => {
    dialogEl.setAttribute('open', String(open))
    trigger.textContent = `Open Dialog ${open}`
  }
  trigger.addEventListener('click', async () => {
    setOpen(true)
    await Promise.resolve()
    setOpen(false)
    await Promise.resolve()
    setOpen(true)
  })
  dialogEl.addEventListener('openchange', (event) => setOpen(event.detail.open))
}
