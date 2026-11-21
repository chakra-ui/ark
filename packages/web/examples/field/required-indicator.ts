import '../../src/components/field/index.js'

import styles from 'styles/field.module.css'

export function mount(root: HTMLElement) {
  root.innerHTML = /* html */ `
  <ark-field class="${styles.Root}" required>
    <ark-field-label>
      <label class="${styles.Label}">
        Username
        <ark-field-required-indicator>*</ark-field-required-indicator>
      </label>
    </ark-field-label>
    <ark-field-input><input class="${styles.Input}" /></ark-field-input>
  </ark-field>`
}
