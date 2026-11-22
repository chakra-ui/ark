import type { DialogElement } from '@ark-ui/web/dialog'
import { createElement, X } from 'lucide'

import '@ark-ui/web/dialog'

import button from 'styles/button.module.css'

import styles from 'styles/dialog.module.css'

export function mount(root: HTMLElement) {
  root.innerHTML = /* html */ `
    <button class="${button.Root}" data-open-parent>Open Parent Dialog</button>
    
  <ark-dialog data-parent>
    
    <ark-dialog-backdrop class="${styles.Backdrop}"></ark-dialog-backdrop>
    <ark-dialog-positioner class="${styles.Positioner}">
      <ark-dialog-content class="${styles.Content}" ><ark-dialog-close-trigger><button class="${styles.CloseTrigger}">${createElement(X, { 'aria-hidden': 'true' }).outerHTML}</button></ark-dialog-close-trigger>
       
  <ark-dialog-title class="${styles.Title}">Parent Dialog</ark-dialog-title>
  <ark-dialog-description class="${styles.Description}">This is the parent dialog. Open a nested dialog to see automatic z-index management.</ark-dialog-description>
       <div class="${styles.Body}"><button class="${button.Root}" data-open-child>Open Nested Dialog</button></div></ark-dialog-content>
    </ark-dialog-positioner>
  </ark-dialog>
    
  <ark-dialog data-child>
    
    <ark-dialog-backdrop class="${styles.Backdrop}"></ark-dialog-backdrop>
    <ark-dialog-positioner class="${styles.Positioner}">
      <ark-dialog-content class="${styles.Content}" ><ark-dialog-close-trigger><button class="${styles.CloseTrigger}">${createElement(X, { 'aria-hidden': 'true' }).outerHTML}</button></ark-dialog-close-trigger>
  <ark-dialog-title class="${styles.Title}">Nested Dialog</ark-dialog-title>
  <ark-dialog-description class="${styles.Description}">This dialog is nested within the parent with proper z-index layering.</ark-dialog-description></ark-dialog-content>
    </ark-dialog-positioner>
  </ark-dialog>`
  const parent = root.querySelector<DialogElement>('[data-parent]')!
  const child = root.querySelector<DialogElement>('[data-child]')!
  root.querySelector('[data-open-parent]')!.addEventListener('click', () => parent.api?.setOpen(true))
  root.querySelector('[data-open-child]')!.addEventListener('click', () => child.api?.setOpen(true))
}
