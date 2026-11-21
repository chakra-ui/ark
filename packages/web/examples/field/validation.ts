import '@ark-ui/web/field'

import button from 'styles/button.module.css'
import styles from 'styles/field.module.css'

export function mount(root: HTMLElement) {
  root.innerHTML = /* html */ `
  <form class="stack" novalidate>
    <ark-field class="${styles.Root}" required validation-mode="onBlur">
      <ark-field-label>
        <label class="${styles.Label}">
          Email
          <ark-field-indicator type="required">*</ark-field-indicator>
        </label>
      </ark-field-label>
      <ark-field-input><input class="${styles.Input}" type="email" placeholder="me@example.com" /></ark-field-input>
      <ark-field-helper-text class="${styles.HelperText}">We'll never share your email.</ark-field-helper-text>
      <ark-field-error-text class="${styles.ErrorText}" match="valueMissing">Email is required</ark-field-error-text>
      <ark-field-error-text class="${styles.ErrorText}" match="typeMismatch">Enter a valid email address</ark-field-error-text>
    </ark-field>
    <button class="${button.Root}" type="submit">Submit</button>
  </form>`

  root.querySelector('form')!.addEventListener('submit', (event) => event.preventDefault())
}
