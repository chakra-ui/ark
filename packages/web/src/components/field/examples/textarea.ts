import '@ark-ui/web/field'

import styles from 'styles/field.module.css'

export function mount(root: HTMLElement) {
  root.innerHTML = /* html */ `
  <ark-field class="${styles.Root}">
    <ark-field-label><label class="${styles.Label}">Label</label></ark-field-label>
    <ark-field-textarea><textarea class="${styles.Textarea}"></textarea></ark-field-textarea>
    <ark-field-helper-text class="${styles.HelperText}">Some additional Info</ark-field-helper-text>
    <ark-field-error-text class="${styles.ErrorText}">Error Info</ark-field-error-text>
  </ark-field>`
}
