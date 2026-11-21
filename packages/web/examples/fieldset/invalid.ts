import '@ark-ui/web/field'
import '@ark-ui/web/fieldset'

import field from 'styles/field.module.css'
import styles from 'styles/fieldset.module.css'

export function mount(root: HTMLElement) {
  root.innerHTML = /* html */ `
  <ark-fieldset invalid>
    <fieldset class="${styles.Root}">
      <ark-fieldset-legend class="${styles.Legend}">Account Information</ark-fieldset-legend>
      <ark-fieldset-error-text class="${styles.ErrorText}">Please fix the errors below to continue.</ark-fieldset-error-text>
      <ark-field class="${field.Root}" invalid>
        <ark-field-label><label class="${field.Label}">Username</label></ark-field-label>
        <ark-field-input><input class="${field.Input}" value="jo" /></ark-field-input>
        <ark-field-error-text class="${field.ErrorText}">Username must be at least 3 characters</ark-field-error-text>
      </ark-field>
      <ark-field class="${field.Root}" invalid>
        <ark-field-label><label class="${field.Label}">Email</label></ark-field-label>
        <ark-field-input><input class="${field.Input}" type="email" value="invalid-email" /></ark-field-input>
        <ark-field-error-text class="${field.ErrorText}">Please enter a valid email address</ark-field-error-text>
      </ark-field>
    </fieldset>
  </ark-fieldset>`
}
