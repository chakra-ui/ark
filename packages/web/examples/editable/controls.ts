import { createElement, Check, X, Pencil } from 'lucide'

import '../../src/components/editable/index.js'

import styles from 'styles/editable.module.css'

const editable = (attrs: string, control = '') => `
  <ark-editable class="${styles.Root}" ${attrs}>
    <ark-editable-label class="${styles.Label}">Label</ark-editable-label>
    <ark-editable-area class="${styles.Area}">
      <ark-editable-input><input class="${styles.Input}" /></ark-editable-input>
      <ark-editable-preview class="${styles.Preview}"></ark-editable-preview>
    </ark-editable-area>
    ${control ? `<ark-editable-control class="${styles.Control}">${control}</ark-editable-control>` : ''}
  </ark-editable>`

const editTrigger = `<ark-editable-edit-trigger><button class="${styles.EditTrigger}">${createElement(Pencil, { 'aria-hidden': 'true' }).outerHTML}</button></ark-editable-edit-trigger>`

export function mount(root: HTMLElement) {
  root.innerHTML = editable(
    `default-value="Click edit to start"`,
    `<ark-editable-submit-trigger><button class="${styles.SubmitTrigger}">${createElement(Check, { 'aria-hidden': 'true' }).outerHTML}</button></ark-editable-submit-trigger>
    <ark-editable-cancel-trigger><button class="${styles.CancelTrigger}">${createElement(X, { 'aria-hidden': 'true' }).outerHTML}</button></ark-editable-cancel-trigger>
    ${editTrigger}`,
  )
}
