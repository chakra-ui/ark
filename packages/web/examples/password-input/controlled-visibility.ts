import { createElement, Eye, EyeOff } from 'lucide'

import '../../src/components/password-input/index.js'

import styles from 'styles/password-input.module.css'

const icon = (node: typeof Eye) => createElement(node, { 'aria-hidden': 'true' }).outerHTML

const labelText = (visible: boolean) => `Password is ${visible ? 'visible' : 'hidden'}`

export function mount(root: HTMLElement) {
  root.innerHTML = /* html */ `
  <ark-password-input class="${styles.Root}" visible="false">
    <ark-password-input-label class="${styles.Label}">${labelText(false)}</ark-password-input-label>
    <ark-password-input-control class="${styles.Control}">
      <ark-password-input-input><input class="${styles.Input}" /></ark-password-input-input>
      <ark-password-input-visibility-trigger>
        <button class="${styles.VisibilityTrigger}">
          <ark-password-input-indicator class="${styles.Indicator}">${icon(Eye)}</ark-password-input-indicator>
          <ark-password-input-indicator class="${styles.Indicator}" fallback>${icon(EyeOff)}</ark-password-input-indicator>
        </button>
      </ark-password-input-visibility-trigger>
    </ark-password-input-control>
  </ark-password-input>`

  const el = root.querySelector('ark-password-input')!
  const label = root.querySelector('ark-password-input-label')!

  el.addEventListener('visibilitychange', (event) => {
    const { visible } = event.detail
    el.setAttribute('visible', String(visible))
    label.textContent = labelText(visible)
  })
}
