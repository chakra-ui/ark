import '../../src/components/dialog/index.js'

import styles from 'styles/dialog.module.css'

import button from 'styles/button.module.css'

const dialogMarkup = (
  attrs: string,
  trigger: string,
  content: string,
  contentAttrs = '',
  positioner = styles.Positioner,
) => `
  <ark-dialog ${attrs}>
    ${trigger}
    <ark-dialog-backdrop class="${styles.Backdrop}"></ark-dialog-backdrop>
    <ark-dialog-positioner class="${positioner}">
      <ark-dialog-content class="${styles.Content}" ${contentAttrs}>${content}</ark-dialog-content>
    </ark-dialog-positioner>
  </ark-dialog>`

const openButton = (label: string) =>
  `<ark-dialog-trigger><button class="${button.Root}">${label}</button></ark-dialog-trigger>`

const heading = (title: string, description: string) => `
  <ark-dialog-title class="${styles.Title}">${title}</ark-dialog-title>
  <ark-dialog-description class="${styles.Description}">${description}</ark-dialog-description>`

export function mount(root: HTMLElement) {
  root.innerHTML = dialogMarkup(
    'role="alertdialog"',
    openButton('Delete Account'),
    `${heading('Are you absolutely sure?', 'This action cannot be undone. This will permanently delete your account and remove your data from our servers.')}
     <div class="${styles.Actions}">
       <ark-dialog-close-trigger><button class="${button.Root}">Cancel</button></ark-dialog-close-trigger>
       <button class="${button.Root}" data-variant="solid">Delete Account</button>
     </div>`,
  )
}
