import { createElement, Check, X, Pencil } from 'lucide'

import '../../src/components/editable/index.js'

import styles from 'styles/editable.module.css'

const icon = (node: typeof Pencil) => createElement(node, { 'aria-hidden': 'true' }).outerHTML

export function mount(root: HTMLElement) {
  root.innerHTML = /* html */ `
  <ark-editable class="${styles.Root}" default-value="Click edit to start">
    <ark-editable-label class="${styles.Label}">Label</ark-editable-label>
    <ark-editable-area class="${styles.Area}">
      <ark-editable-input><input class="${styles.Input}" /></ark-editable-input>
      <ark-editable-preview class="${styles.Preview}"></ark-editable-preview>
    </ark-editable-area>
    <ark-editable-control class="${styles.Control}">
      <ark-editable-submit-trigger><button class="${styles.SubmitTrigger}">${icon(Check)}</button></ark-editable-submit-trigger>
      <ark-editable-cancel-trigger><button class="${styles.CancelTrigger}">${icon(X)}</button></ark-editable-cancel-trigger>
      <ark-editable-edit-trigger><button class="${styles.EditTrigger}">${icon(Pencil)}</button></ark-editable-edit-trigger>
    </ark-editable-control>
  </ark-editable>`
}
