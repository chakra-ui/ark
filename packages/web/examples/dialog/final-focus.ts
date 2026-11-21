import { createElement, X } from 'lucide'

import '../../src/components/dialog/index.js'

import button from 'styles/button.module.css'

import styles from 'styles/dialog.module.css'

const attr = (name: string, value?: string) => (value === undefined ? '' : `${name}="${value}"`)

const openButton = (label: string) =>
  /* html */ `<ark-dialog-trigger><button class="${button.Root}">${label}</button></ark-dialog-trigger>`

interface DialogProps {
  trigger: string
  finalFocus?: string
}

const dialog = ({ trigger, finalFocus }: DialogProps, children: string[]) => /* html */ `
  <ark-dialog ${attr('final-focus', finalFocus)}>
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
  root.innerHTML = /* html */ `
  <div class="stack">
    <button class="${button.Root}" id="dialog-final-focus">I will receive focus when dialog closes</button>
    ${dialog({ trigger: 'Open Dialog', finalFocus: '#dialog-final-focus' }, [
      closeButton,
      heading({
        title: 'Focus Redirect',
        description: 'When this dialog closes, focus will return to the button above instead of the trigger.',
      }),
    ])}
  </div>`
}
