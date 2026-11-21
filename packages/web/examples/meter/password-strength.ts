import type { MeterElement } from '../../src/components/meter/index.js'

import '../../src/components/meter/index.js'

import styles from 'styles/meter.module.css'

const labels = ['Too weak', 'Weak', 'Fair', 'Good', 'Strong', 'Very strong']

const score = (password: string) => {
  let points = 0
  if (password.length >= 8) points++
  if (password.length >= 12) points++
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) points++
  if (/\d/.test(password)) points++
  if (/[^a-zA-Z0-9]/.test(password)) points++
  return points
}

export function mount(root: HTMLElement) {
  root.innerHTML = /* html */ `
  <div class="${styles.Field}">
    <input type="password" class="${styles.Input}" placeholder="Choose a password" aria-label="Password" />
    <ark-meter class="${styles.Root} ${styles.Graded}" value="0" max="5" low="2" high="3" optimum="5">
      <ark-meter-label class="${styles.Label}">Strength</ark-meter-label>
      <ark-meter-value-text class="${styles.ValueText}"></ark-meter-value-text>
      <ark-meter-track class="${styles.Track}">
        <ark-meter-range class="${styles.Indicator}"></ark-meter-range>
      </ark-meter-track>
    </ark-meter>
    <span class="${styles.Hint}">Use 12 or more characters with a mix of letters, numbers and symbols.</span>
  </div>`

  const input = root.querySelector('input')!
  const meterEl = root.querySelector<MeterElement>('ark-meter')!

  meterEl.translations = {
    value: ({ value }) => labels[value] ?? '',
  }

  input.addEventListener('input', () => {
    meterEl.setAttribute('value', String(score(input.value)))
  })
}
