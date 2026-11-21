import '@ark-ui/web/editable'

import styles from 'styles/editable.module.css'

export function mount(root: HTMLElement) {
  root.innerHTML = /* html */ `
  <ark-editable class="${styles.Root}" default-value="Double-click to edit" activation-mode="dblclick">
    <ark-editable-label class="${styles.Label}">Label</ark-editable-label>
    <ark-editable-area class="${styles.Area}">
      <ark-editable-input><input class="${styles.Input}" /></ark-editable-input>
      <ark-editable-preview class="${styles.Preview}"></ark-editable-preview>
    </ark-editable-area>
  </ark-editable>`
}
