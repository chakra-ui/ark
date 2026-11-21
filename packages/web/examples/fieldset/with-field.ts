import '../../src/components/field/index.js'
import '../../src/components/fieldset/index.js'

import field from 'styles/field.module.css'
import styles from 'styles/fieldset.module.css'

export function mount(root: HTMLElement) {
  root.innerHTML = /* html */ `
  <ark-fieldset>
    <fieldset class="${styles.Root}">
      <ark-fieldset-legend class="${styles.Legend}">Personal Information</ark-fieldset-legend>
      <ark-field class="${field.Root}">
        <ark-field-label><label class="${field.Label}">First Name</label></ark-field-label>
        <ark-field-input><input class="${field.Input}" placeholder="Enter your first name" /></ark-field-input>
        <ark-field-helper-text class="${field.HelperText}">As it appears on your ID</ark-field-helper-text>
      </ark-field>
      <ark-field class="${field.Root}">
        <ark-field-label><label class="${field.Label}">Last Name</label></ark-field-label>
        <ark-field-input><input class="${field.Input}" placeholder="Enter your last name" /></ark-field-input>
      </ark-field>
    </fieldset>
  </ark-fieldset>`
}
