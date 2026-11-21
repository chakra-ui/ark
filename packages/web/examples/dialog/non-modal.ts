import { createElement, X } from 'lucide'

import '../../src/components/dialog/index.js'

import button from 'styles/button.module.css'

import styles from 'styles/dialog.module.css'

const openButton = (label: string) =>
  /* html */ `<ark-dialog-trigger><button class="${button.Root}">${label}</button></ark-dialog-trigger>`

const closeButton = /* html */ `<ark-dialog-close-trigger><button class="${styles.CloseTrigger}">${createElement(X, { 'aria-hidden': 'true' }).outerHTML}</button></ark-dialog-close-trigger>`

const heading = (title: string, description: string) => /* html */ `
  <ark-dialog-title class="${styles.Title}">${title}</ark-dialog-title>
  <ark-dialog-description class="${styles.Description}">${description}</ark-dialog-description>`

export function mount(root: HTMLElement) {
  root.innerHTML = /* html */ `
  <ark-dialog modal="false">
    ${openButton('Open Non-Modal Dialog')}
    <ark-dialog-positioner class="${styles.Positioner}">
      <ark-dialog-content class="${styles.Content}">
        ${closeButton}
        ${heading('Non-Modal Dialog', 'This dialog allows interaction with elements outside. You can click buttons, select text, and interact with the page behind it.')}
      </ark-dialog-content>
    </ark-dialog-positioner>
  </ark-dialog>`
}
