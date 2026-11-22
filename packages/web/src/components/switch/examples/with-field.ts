import '@ark-ui/web/switch'
import '@ark-ui/web/field'

import field from 'styles/field.module.css'

import styles from 'styles/switch.module.css'

export function mount(root: HTMLElement) {
  root.innerHTML = /* html */ `
  <ark-field class="${field.Root}">
    <ark-switch>
      <label class="${styles.Root}">
        <ark-switch-control class="${styles.Control}"><ark-switch-thumb class="${styles.Thumb}"></ark-switch-thumb></ark-switch-control>
        <ark-switch-label class="${styles.Label}">Label</ark-switch-label>
        <ark-switch-hidden-input></ark-switch-hidden-input>
      </label>
    </ark-switch>
    <ark-field-helper-text class="${field.HelperText}">Additional Info</ark-field-helper-text>
    <ark-field-error-text class="${field.ErrorText}">Error Info</ark-field-error-text>
  </ark-field>`
}
