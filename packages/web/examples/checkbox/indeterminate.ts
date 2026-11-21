import { createElement, Check, Minus } from 'lucide'

import '../../src/components/checkbox/index.js'

import styles from 'styles/checkbox.module.css'

const checkbox = (attrs: string, label = 'Checkbox', indeterminate = false) => `
  <ark-checkbox ${attrs}>
    <label class="${styles.Root}">
      <ark-checkbox-control class="${styles.Control}">
        <ark-checkbox-indicator class="${styles.Indicator}">${createElement(Check, { 'aria-hidden': 'true' }).outerHTML}</ark-checkbox-indicator>
        ${indeterminate ? `<ark-checkbox-indicator class="${styles.Indicator}" indeterminate>${createElement(Minus, { 'aria-hidden': 'true' }).outerHTML}</ark-checkbox-indicator>` : ''}
      </ark-checkbox-control>
      <ark-checkbox-label class="${styles.Label}">${label}</ark-checkbox-label>
      <ark-checkbox-hidden-input></ark-checkbox-hidden-input>
    </label>
  </ark-checkbox>`

export function mount(root: HTMLElement) {
  root.innerHTML = checkbox(`default-checked="indeterminate"`, 'Indeterminate', true)
}
