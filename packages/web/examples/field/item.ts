import '../../src/components/field/index.js'

import styles from 'styles/field.module.css'

export function mount(root: HTMLElement) {
  root.innerHTML = /* html */ `
  <ark-field class="${styles.Root}" target="amount">
    <ark-field-label><label class="${styles.Label}">Amount</label></ark-field-label>
    <ark-field-item value="currency">
      <ark-field-select>
        <select class="${styles.Select}" aria-label="Currency">
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
        </select>
      </ark-field-select>
    </ark-field-item>
    <ark-field-item value="amount">
      <ark-field-input><input class="${styles.Input}" /></ark-field-input>
    </ark-field-item>
    <ark-field-helper-text class="${styles.HelperText}">Enter the amount</ark-field-helper-text>
    <ark-field-error-text class="${styles.ErrorText}">Invalid amount</ark-field-error-text>
  </ark-field>`
}
