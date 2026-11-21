import { createElement, Check, Minus } from 'lucide'

import '../../src/components/checkbox/index.js'

import styles from 'styles/checkbox.module.css'

const checkIcon = createElement(Check, { 'aria-hidden': 'true' }).outerHTML

const minusIcon = createElement(Minus, { 'aria-hidden': 'true' }).outerHTML

const checkbox = ({ label, defaultChecked }: { label: string; defaultChecked: 'indeterminate' }) => /* html */ `
  <ark-checkbox default-checked="${defaultChecked}">
    <label class="${styles.Root}">
      <ark-checkbox-control class="${styles.Control}">
        <ark-checkbox-indicator class="${styles.Indicator}">${checkIcon}</ark-checkbox-indicator>
        <ark-checkbox-indicator class="${styles.Indicator}" indeterminate>${minusIcon}</ark-checkbox-indicator>
      </ark-checkbox-control>
      <ark-checkbox-label class="${styles.Label}">${label}</ark-checkbox-label>
      <ark-checkbox-hidden-input></ark-checkbox-hidden-input>
    </label>
  </ark-checkbox>`

export function mount(root: HTMLElement) {
  root.innerHTML = checkbox({ label: 'Indeterminate', defaultChecked: 'indeterminate' })
}
