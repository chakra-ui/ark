import '@ark-ui/web/field'

import button from 'styles/button.module.css'
import styles from 'styles/field.module.css'

export function mount(root: HTMLElement) {
  root.innerHTML = /* html */ `
  <form class="stack">
    <ark-field class="${styles.Root}">
      <ark-field-label><label class="${styles.Label}">Email</label></ark-field-label>
      <ark-field-input>
        <input class="${styles.Input}" type="email" name="email" value="taken@example.com" />
      </ark-field-input>
      <ark-field-helper-text class="${styles.HelperText}">Submit to check the email with the server.</ark-field-helper-text>
      <ark-field-error-text class="${styles.ErrorText}"></ark-field-error-text>
    </ark-field>
    <button class="${button.Root}" type="submit">Submit</button>
  </form>`

  const field = root.querySelector('ark-field')!
  const errorText = root.querySelector('ark-field-error-text')!
  root.querySelector('form')!.addEventListener('submit', (event) => {
    event.preventDefault()
    field.errors = ['This email is already registered']
    errorText.textContent = field.api?.errors[0] ?? ''
  })
}
