import { createElement, Eye, EyeOff } from 'lucide'

import '../../src/components/password-input/index.js'

import styles from 'styles/password-input.module.css'

type Strength = 'weak' | 'medium' | 'strong'

const icon = (node: typeof Eye) => createElement(node, { 'aria-hidden': 'true' }).outerHTML

const characterClasses = [/[a-z]/, /[A-Z]/, /[0-9]/, /[^a-zA-Z0-9]/]

const diversityOf = (password: string) => characterClasses.filter((pattern) => pattern.test(password)).length

const strengthOf = (password: string): Strength => {
  const diversity = diversityOf(password)
  if (diversity >= 4 && password.length >= 8) return 'strong'
  if (diversity >= 2 && password.length >= 6) return 'medium'
  return 'weak'
}

export function mount(root: HTMLElement) {
  root.innerHTML = /* html */ `
  <ark-password-input class="${styles.Root}">
    <ark-password-input-label class="${styles.Label}">Password</ark-password-input-label>
    <ark-password-input-control class="${styles.Control}">
      <ark-password-input-input>
        <input class="${styles.Input}" value="asdfasdf" placeholder="Enter your password" />
      </ark-password-input-input>
      <ark-password-input-visibility-trigger>
        <button class="${styles.VisibilityTrigger}">
          <ark-password-input-indicator class="${styles.Indicator}">${icon(Eye)}</ark-password-input-indicator>
          <ark-password-input-indicator class="${styles.Indicator}" fallback>${icon(EyeOff)}</ark-password-input-indicator>
        </button>
      </ark-password-input-visibility-trigger>
    </ark-password-input-control>
    <div class="${styles.StrengthMeter}">
      <div class="${styles.StrengthBar}">
        <div class="${styles.StrengthFill}"></div>
      </div>
      <div class="${styles.StrengthLabel}"></div>
    </div>
  </ark-password-input>`

  const input = root.querySelector('input')!
  const meter = root.querySelector<HTMLElement>(`.${styles.StrengthMeter}`)!
  const fill = root.querySelector<HTMLElement>(`.${styles.StrengthFill}`)!
  const label = root.querySelector<HTMLElement>(`.${styles.StrengthLabel}`)!

  const update = () => {
    const strength = strengthOf(input.value)
    meter.hidden = input.value.length === 0
    fill.dataset.strength = strength
    label.textContent = `${strength} password`
  }

  input.addEventListener('input', update)
  update()
}
