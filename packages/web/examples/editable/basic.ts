import { createElement, Pencil } from 'lucide'

import '@ark-ui/web/editable'

import styles from 'styles/editable.module.css'

export function mount(root: HTMLElement) {
  root.innerHTML = /* html */ `
  <ark-editable class="${styles.Root}" placeholder="Enter text..." default-value="Hello World">
    <ark-editable-label class="${styles.Label}">Label</ark-editable-label>
    <ark-editable-area class="${styles.Area}">
      <ark-editable-input><input class="${styles.Input}" /></ark-editable-input>
      <ark-editable-preview class="${styles.Preview}"></ark-editable-preview>
    </ark-editable-area>
    <ark-editable-control class="${styles.Control}"><ark-editable-edit-trigger><button class="${styles.EditTrigger}">${createElement(Pencil, { 'aria-hidden': 'true' }).outerHTML}</button></ark-editable-edit-trigger></ark-editable-control>
  </ark-editable>`
}
