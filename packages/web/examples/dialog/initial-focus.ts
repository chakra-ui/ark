import { createElement, X } from 'lucide'

import '../../src/components/dialog/index.js'

import styles from 'styles/dialog.module.css'

import button from 'styles/button.module.css'

import field from 'styles/field.module.css'

const attr = (name: string, value?: string) => (value === undefined ? '' : `${name}="${value}"`)

const openButton = (label: string) =>
  /* html */ `<ark-dialog-trigger><button class="${button.Root}">${label}</button></ark-dialog-trigger>`

interface DialogProps {
  trigger: string
  initialFocus?: string
}

const dialog = ({ trigger, initialFocus }: DialogProps, children: string[]) => /* html */ `
  <ark-dialog ${attr('initial-focus', initialFocus)}>
    ${openButton(trigger)}
    <ark-dialog-backdrop class="${styles.Backdrop}"></ark-dialog-backdrop>
    <ark-dialog-positioner class="${styles.Positioner}">
      <ark-dialog-content class="${styles.Content}">${children.join('')}</ark-dialog-content>
    </ark-dialog-positioner>
  </ark-dialog>`

const closeButton = /* html */ `<ark-dialog-close-trigger><button class="${styles.CloseTrigger}">${createElement(X, { 'aria-hidden': 'true' }).outerHTML}</button></ark-dialog-close-trigger>`

const heading = ({ title, description }: { title: string; description: string }) => /* html */ `
  <ark-dialog-title class="${styles.Title}">${title}</ark-dialog-title>
  <ark-dialog-description class="${styles.Description}">${description}</ark-dialog-description>`

export function mount(root: HTMLElement) {
  root.innerHTML = dialog({ trigger: 'Open Dialog', initialFocus: '#dialog-initial-focus' }, [
    closeButton,
    heading({ title: 'Edit Profile', description: 'The first input will be focused when the dialog opens.' }),
    /* html */ `
     <div class="${styles.Body}">
       <input id="dialog-initial-focus" class="${field.Input}" placeholder="Enter your name..." />
       <input class="${field.Input}" placeholder="Enter your email..." />
     </div>`,
  ])
}
