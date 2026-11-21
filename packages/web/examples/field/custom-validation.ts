import '../../src/components/field/index.js'

import button from 'styles/button.module.css'
import styles from 'styles/field.module.css'

const reserved = ['admin', 'root', 'support']

export function mount(root: HTMLElement) {
  root.innerHTML = /* html */ `
  <form class="stack" novalidate>
    <ark-field class="${styles.Root}" required validation-mode="onChange">
      <ark-field-label><label class="${styles.Label}">Username</label></ark-field-label>
      <ark-field-input><input class="${styles.Input}" /></ark-field-input>
      <ark-field-error-text class="${styles.ErrorText}"></ark-field-error-text>
    </ark-field>
    <button class="${button.Root}" type="submit">Submit</button>
  </form>`

  const field = root.querySelector('ark-field')!
  const errorText = root.querySelector('ark-field-error-text')!
  field.validate = ({ value }) => {
    if (value.length > 0 && value.length < 3) return 'Use at least 3 characters'
    if (reserved.includes(value.toLowerCase())) return 'This username is reserved'
  }
  field.addEventListener('validitychange', (event) => {
    errorText.textContent = event.detail.errors[0] ?? ''
  })
  root.querySelector('form')!.addEventListener('submit', (event) => event.preventDefault())
}
