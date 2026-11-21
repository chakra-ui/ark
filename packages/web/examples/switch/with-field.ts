import '../../src/components/switch/index.js'
import '../../src/components/field/index.js'

import field from 'styles/field.module.css'

import styles from 'styles/switch.module.css'

const switchMarkup = (attrs: string) => /* html */ `
  <ark-switch ${attrs}>
    <label class="${styles.Root}">
      <ark-switch-control class="${styles.Control}"><ark-switch-thumb class="${styles.Thumb}"></ark-switch-thumb></ark-switch-control>
      <ark-switch-label class="${styles.Label}">Label</ark-switch-label>
      <ark-switch-hidden-input></ark-switch-hidden-input>
    </label>
  </ark-switch>`

export function mount(root: HTMLElement) {
  root.innerHTML = /* html */ `
  <ark-field class="${field.Root}">
    ${switchMarkup('')}
    <ark-field-helper-text class="${field.HelperText}">Additional Info</ark-field-helper-text>
    <ark-field-error-text class="${field.ErrorText}">Error Info</ark-field-error-text>
  </ark-field>`
}
