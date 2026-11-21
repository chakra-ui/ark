import { createElement, X } from 'lucide'

import '../../src/components/dialog/index.js'

import styles from 'styles/dialog.module.css'

import button from 'styles/button.module.css'

import field from 'styles/field.module.css'

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

const closeButton = `<ark-dialog-close-trigger><button class="${styles.CloseTrigger}">${createElement(X, { 'aria-hidden': 'true' }).outerHTML}</button></ark-dialog-close-trigger>`

const heading = (title: string, description: string) => `
  <ark-dialog-title class="${styles.Title}">${title}</ark-dialog-title>
  <ark-dialog-description class="${styles.Description}">${description}</ark-dialog-description>`

export function mount(root: HTMLElement) {
  root.innerHTML = dialogMarkup(
    'initial-focus="#dialog-initial-focus"',
    openButton('Open Dialog'),
    `${closeButton}
     ${heading('Edit Profile', 'The first input will be focused when the dialog opens.')}
     <div class="${styles.Body}">
       <input id="dialog-initial-focus" class="${field.Input}" placeholder="Enter your name..." />
       <input class="${field.Input}" placeholder="Enter your email..." />
     </div>`,
  )
}
