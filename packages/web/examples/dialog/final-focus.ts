import { createElement, X } from 'lucide'

import '../../src/components/dialog/index.js'

import button from 'styles/button.module.css'

import styles from 'styles/dialog.module.css'

const dialogMarkup = (
  attrs: string,
  trigger: string,
  content: string,
  contentAttrs = '',
  positioner = styles.Positioner,
) => /* html */ `
  <ark-dialog ${attrs}>
    ${trigger}
    <ark-dialog-backdrop class="${styles.Backdrop}"></ark-dialog-backdrop>
    <ark-dialog-positioner class="${positioner}">
      <ark-dialog-content class="${styles.Content}" ${contentAttrs}>${content}</ark-dialog-content>
    </ark-dialog-positioner>
  </ark-dialog>`

const openButton = (label: string) =>
  /* html */ `<ark-dialog-trigger><button class="${button.Root}">${label}</button></ark-dialog-trigger>`

const closeButton = /* html */ `<ark-dialog-close-trigger><button class="${styles.CloseTrigger}">${createElement(X, { 'aria-hidden': 'true' }).outerHTML}</button></ark-dialog-close-trigger>`

const heading = (title: string, description: string) => /* html */ `
  <ark-dialog-title class="${styles.Title}">${title}</ark-dialog-title>
  <ark-dialog-description class="${styles.Description}">${description}</ark-dialog-description>`

export function mount(root: HTMLElement) {
  root.innerHTML = /* html */ `
  <div class="stack">
    <button class="${button.Root}" id="dialog-final-focus">I will receive focus when dialog closes</button>
    ${dialogMarkup(
      'final-focus="#dialog-final-focus"',
      openButton('Open Dialog'),
      `${closeButton}${heading('Focus Redirect', 'When this dialog closes, focus will return to the button above instead of the trigger.')}`,
    )}
  </div>`
}
