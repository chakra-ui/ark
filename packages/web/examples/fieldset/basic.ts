import '../../src/components/field/index.js'
import '../../src/components/fieldset/index.js'

import field from 'styles/field.module.css'
import styles from 'styles/fieldset.module.css'

export function mount(root: HTMLElement) {
  root.innerHTML = /* html */ `
  <ark-fieldset>
    <fieldset class="${styles.Root}">
      <ark-fieldset-legend class="${styles.Legend}">Contact Details</ark-fieldset-legend>
      <ark-field class="${field.Root}">
        <ark-field-label><label class="${field.Label}">Name</label></ark-field-label>
        <ark-field-input><input class="${field.Input}" placeholder="John Doe" /></ark-field-input>
      </ark-field>
      <ark-field class="${field.Root}">
        <ark-field-label><label class="${field.Label}">Email</label></ark-field-label>
        <ark-field-input><input class="${field.Input}" type="email" placeholder="john@example.com" /></ark-field-input>
      </ark-field>
    </fieldset>
  </ark-fieldset>`
}
