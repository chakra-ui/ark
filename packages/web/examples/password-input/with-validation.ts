import { createElement, Eye, EyeOff } from 'lucide'

import '../../src/components/password-input/index.js'

import styles from 'styles/password-input.module.css'

const icon = (node: typeof Eye) => createElement(node, { 'aria-hidden': 'true' }).outerHTML

const MIN_LENGTH = 8

const validationMessage = (valid: boolean) =>
  valid ? 'Password is valid' : `Password must be at least ${MIN_LENGTH} characters`

export function mount(root: HTMLElement) {
  root.innerHTML = /* html */ `
  <ark-password-input class="${styles.Root}">
    <ark-password-input-label class="${styles.Label}">Password (min ${MIN_LENGTH} characters)</ark-password-input-label>
    <ark-password-input-control class="${styles.Control}">
      <ark-password-input-input>
        <input class="${styles.Input}" placeholder="Enter your password" />
      </ark-password-input-input>
      <ark-password-input-visibility-trigger>
        <button class="${styles.VisibilityTrigger}">
          <ark-password-input-indicator class="${styles.Indicator}">${icon(Eye)}</ark-password-input-indicator>
          <ark-password-input-indicator class="${styles.Indicator}" fallback>${icon(EyeOff)}</ark-password-input-indicator>
        </button>
      </ark-password-input-visibility-trigger>
    </ark-password-input-control>
    <p class="${styles.ValidationMessage}" hidden></p>
  </ark-password-input>`

  const el = root.querySelector('ark-password-input')!
  const input = root.querySelector('input')!
  const message = root.querySelector('p')!

  input.addEventListener('input', () => {
    const empty = input.value.length === 0
    const valid = input.value.length >= MIN_LENGTH

    el.toggleAttribute('invalid', !empty && !valid)
    message.hidden = empty
    message.dataset.valid = String(valid)
    message.textContent = validationMessage(valid)
  })
}
