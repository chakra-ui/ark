import '@ark-ui/web/field'

import styles from 'styles/field.module.css'

export function mount(root: HTMLElement) {
  root.innerHTML = /* html */ `
  <ark-field class="${styles.Root}" required>
    <ark-field-label>
      <label class="${styles.Label}">
        Username
        <ark-field-indicator type="required">*</ark-field-indicator>
      </label>
    </ark-field-label>
    <ark-field-input><input class="${styles.Input}" /></ark-field-input>
  </ark-field>`
}
