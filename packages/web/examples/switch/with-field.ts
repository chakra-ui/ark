import '../../src/components/switch/index.js'

import field from 'styles/field.module.css'

import styles from 'styles/switch.module.css'

const switchMarkup = (attrs: string) => `
  <ark-switch ${attrs}>
    <label class="${styles.Root}">
      <ark-switch-control class="${styles.Control}"><ark-switch-thumb class="${styles.Thumb}"></ark-switch-thumb></ark-switch-control>
      <ark-switch-label class="${styles.Label}">Label</ark-switch-label>
      <ark-switch-hidden-input></ark-switch-hidden-input>
    </label>
  </ark-switch>`

export function mount(root: HTMLElement) {
  root.innerHTML = /* html */ `
  <div class="${field.Root}">
    ${switchMarkup('')}
    <span class="${field.HelperText}">Additional Info</span>
    <span class="${field.ErrorText}" hidden>Error Info</span>
  </div>`
}
