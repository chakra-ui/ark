import type { DialogElement } from '@ark-ui/web/dialog'
import { createElement, X } from 'lucide'

import '@ark-ui/web/dialog'

import button from 'styles/button.module.css'

import styles from 'styles/dialog.module.css'

import field from 'styles/field.module.css'

export function mount(root: HTMLElement) {
  root.innerHTML = /* html */ `
    <button class="${button.Root}" data-open>Open Form</button>
    
  <ark-dialog open="false" data-form>
    
    <ark-dialog-backdrop class="${styles.Backdrop}"></ark-dialog-backdrop>
    <ark-dialog-positioner class="${styles.Positioner}">
      <ark-dialog-content class="${styles.Content}" ><ark-dialog-close-trigger><button class="${styles.CloseTrigger}">${createElement(X, { 'aria-hidden': 'true' }).outerHTML}</button></ark-dialog-close-trigger>
       
  <ark-dialog-title class="${styles.Title}">Edit Content</ark-dialog-title>
  <ark-dialog-description class="${styles.Description}">Make changes to your content. You'll be asked to confirm before closing if there are unsaved changes.</ark-dialog-description>
       <div class="${styles.Body}">
         <textarea class="${field.Textarea}" placeholder="Enter some text..." rows="4"></textarea>
       </div></ark-dialog-content>
    </ark-dialog-positioner>
  </ark-dialog>
    
  <ark-dialog data-confirm>
    
    <ark-dialog-backdrop class="${styles.Backdrop}"></ark-dialog-backdrop>
    <ark-dialog-positioner class="${styles.Positioner}">
      <ark-dialog-content class="${styles.Content}" ><ark-dialog-close-trigger><button class="${styles.CloseTrigger}">${createElement(X, { 'aria-hidden': 'true' }).outerHTML}</button></ark-dialog-close-trigger>
       
  <ark-dialog-title class="${styles.Title}">Unsaved Changes</ark-dialog-title>
  <ark-dialog-description class="${styles.Description}">You have unsaved changes. Are you sure you want to close without saving?</ark-dialog-description>
       <div class="${styles.Actions}">
         <button class="${button.Root}" data-keep>Keep Editing</button>
         <button class="${button.Root}" data-variant="solid" data-discard>Discard Changes</button>
       </div></ark-dialog-content>
    </ark-dialog-positioner>
  </ark-dialog>`
  const form = root.querySelector<DialogElement>('[data-form]')!
  const confirm = root.querySelector<DialogElement>('[data-confirm]')!
  const textarea = root.querySelector('textarea')!
  root.querySelector('[data-open]')!.addEventListener('click', () => form.setAttribute('open', 'true'))
  form.addEventListener('openchange', (event) => {
    if (event.target !== form) return
    const { open } = event.detail
    if (!open && textarea.value.trim()) confirm.api?.setOpen(true)
    else form.setAttribute('open', String(open))
  })
  root.querySelector('[data-keep]')!.addEventListener('click', () => confirm.api?.setOpen(false))
  root.querySelector('[data-discard]')!.addEventListener('click', () => {
    confirm.api?.setOpen(false)
    form.setAttribute('open', 'false')
    textarea.value = ''
  })
}
