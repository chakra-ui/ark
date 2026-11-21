import { createElement, Check } from 'lucide'

import '../../src/components/checkbox/index.js'

import styles from 'styles/checkbox.module.css'

const attr = (name: string, on?: boolean) => (on ? name : '')

const checkIcon = createElement(Check, { 'aria-hidden': 'true' }).outerHTML

const checkbox = ({ label, disabled }: { label: string; disabled?: boolean }) => /* html */ `
  <ark-checkbox ${attr('disabled', disabled)}>
    <label class="${styles.Root}">
      <ark-checkbox-control class="${styles.Control}">
        <ark-checkbox-indicator class="${styles.Indicator}">${checkIcon}</ark-checkbox-indicator>
      </ark-checkbox-control>
      <ark-checkbox-label class="${styles.Label}">${label}</ark-checkbox-label>
      <ark-checkbox-hidden-input></ark-checkbox-hidden-input>
    </label>
  </ark-checkbox>`

export function mount(root: HTMLElement) {
  root.innerHTML = checkbox({ label: 'Checkbox', disabled: true })
}
