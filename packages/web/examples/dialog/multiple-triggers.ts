import { createElement, X } from 'lucide'

import '../../src/components/dialog/index.js'

import styles from 'styles/dialog.module.css'

import button from 'styles/button.module.css'

import field from 'styles/field.module.css'

const users = [
  { id: '1', name: 'Alice Johnson', email: 'alice@example.com' },
  { id: '2', name: 'Bob Smith', email: 'bob@example.com' },
  { id: '3', name: 'Carol Davis', email: 'carol@example.com' },
]

export function mount(root: HTMLElement) {
  root.innerHTML = /* html */ `
  <ark-dialog >
    <div class="${button.Group}">
        <ark-dialog-trigger value="1"><button class="${button.Root}">Edit Alice Johnson</button></ark-dialog-trigger><ark-dialog-trigger value="2"><button class="${button.Root}">Edit Bob Smith</button></ark-dialog-trigger><ark-dialog-trigger value="3"><button class="${button.Root}">Edit Carol Davis</button></ark-dialog-trigger>
      </div>
    <ark-dialog-backdrop class="${styles.Backdrop}"></ark-dialog-backdrop>
    <ark-dialog-positioner class="${styles.Positioner}">
      <ark-dialog-content class="${styles.Content}" >
  <ark-dialog-title class="${styles.Title}">Edit User</ark-dialog-title>
  <ark-dialog-description class="${styles.Description}">Update the user's information below.</ark-dialog-description>
       <div class="${styles.Body}">
         <div class="${field.Root}">
           <label class="${field.Label}" for="dialog-user-name">Name</label>
           <input class="${field.Input}" id="dialog-user-name" name="name" />
         </div>
         <div class="${field.Root}">
           <label class="${field.Label}" for="dialog-user-email">Email</label>
           <input class="${field.Input}" id="dialog-user-email" name="email" />
         </div>
       </div>
       <div class="${styles.Actions}">
         <ark-dialog-close-trigger><button class="${button.Root}">Cancel</button></ark-dialog-close-trigger>
         <ark-dialog-close-trigger><button class="${button.Root}" data-variant="solid">Save Changes</button></ark-dialog-close-trigger>
       </div>
       <ark-dialog-close-trigger><button class="${styles.CloseTrigger}">${createElement(X, { 'aria-hidden': 'true' }).outerHTML}</button></ark-dialog-close-trigger></ark-dialog-content>
    </ark-dialog-positioner>
  </ark-dialog>`
  root.querySelector('ark-dialog')!.addEventListener('triggervaluechange', (event) => {
    const user = users.find((user) => user.id === event.detail.value)
    if (!user) return
    root.querySelector<HTMLInputElement>('input[name=name]')!.value = user.name
    root.querySelector<HTMLInputElement>('input[name=email]')!.value = user.email
  })
}
