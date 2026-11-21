import '../../src/components/field/index.js'
import '../../src/components/fieldset/index.js'

import field from 'styles/field.module.css'
import styles from 'styles/fieldset.module.css'

export function mount(root: HTMLElement) {
  root.innerHTML = /* html */ `
  <ark-fieldset disabled>
    <fieldset class="${styles.Root}">
      <ark-fieldset-legend class="${styles.Legend}">Shipping Address</ark-fieldset-legend>
      <ark-fieldset-helper-text class="${styles.HelperText}">
        Your address cannot be changed after order confirmation.
      </ark-fieldset-helper-text>
      <ark-field class="${field.Root}">
        <ark-field-label><label class="${field.Label}">Street</label></ark-field-label>
        <ark-field-input><input class="${field.Input}" value="123 Main St" /></ark-field-input>
      </ark-field>
      <ark-field class="${field.Root}">
        <ark-field-label><label class="${field.Label}">City</label></ark-field-label>
        <ark-field-input><input class="${field.Input}" value="San Francisco" /></ark-field-input>
      </ark-field>
    </fieldset>
  </ark-fieldset>`
}
