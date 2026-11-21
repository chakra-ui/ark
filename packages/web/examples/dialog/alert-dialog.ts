import '../../src/components/dialog/index.js'

import styles from 'styles/dialog.module.css'

import button from 'styles/button.module.css'

const attr = (name: string, value?: string) => (value === undefined ? '' : `${name}="${value}"`)

const openButton = (label: string) =>
  /* html */ `<ark-dialog-trigger><button class="${button.Root}">${label}</button></ark-dialog-trigger>`

interface DialogProps {
  trigger: string
  role?: 'dialog' | 'alertdialog'
}

const dialog = ({ trigger, role }: DialogProps, children: string[]) => /* html */ `
  <ark-dialog ${attr('role', role)}>
    ${openButton(trigger)}
    <ark-dialog-backdrop class="${styles.Backdrop}"></ark-dialog-backdrop>
    <ark-dialog-positioner class="${styles.Positioner}">
      <ark-dialog-content class="${styles.Content}">${children.join('')}</ark-dialog-content>
    </ark-dialog-positioner>
  </ark-dialog>`

const heading = ({ title, description }: { title: string; description: string }) => /* html */ `
  <ark-dialog-title class="${styles.Title}">${title}</ark-dialog-title>
  <ark-dialog-description class="${styles.Description}">${description}</ark-dialog-description>`

const actions = (children: string[]) => /* html */ `<div class="${styles.Actions}">${children.join('')}</div>`

const closeAction = ({ label, solid = false }: { label: string; solid?: boolean }) =>
  /* html */ `<ark-dialog-close-trigger><button class="${button.Root}" ${solid ? 'data-variant="solid"' : ''}>${label}</button></ark-dialog-close-trigger>`

export function mount(root: HTMLElement) {
  root.innerHTML = dialog({ trigger: 'Delete Account', role: 'alertdialog' }, [
    heading({
      title: 'Are you absolutely sure?',
      description:
        'This action cannot be undone. This will permanently delete your account and remove your data from our servers.',
    }),
    actions([
      closeAction({ label: 'Cancel' }),
      /* html */ `<button class="${button.Root}" data-variant="solid">Delete Account</button>`,
    ]),
  ])
}
