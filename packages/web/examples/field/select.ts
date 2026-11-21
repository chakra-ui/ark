import '../../src/components/field/index.js'

import styles from 'styles/field.module.css'

export function mount(root: HTMLElement) {
  root.innerHTML = /* html */ `
  <ark-field class="${styles.Root}">
    <ark-field-label><label class="${styles.Label}">Label</label></ark-field-label>
    <ark-field-select>
      <select class="${styles.Select}">
        <option value="1">Option 1</option>
        <option value="2">Option 2</option>
        <option value="3">Option 3</option>
      </select>
    </ark-field-select>
    <ark-field-helper-text class="${styles.HelperText}">Some additional Info</ark-field-helper-text>
    <ark-field-error-text class="${styles.ErrorText}">Error Info</ark-field-error-text>
  </ark-field>`
}
