import { createElement, Check, Minus } from 'lucide'

import '../../src/components/checkbox/index.js'

import field from 'styles/field.module.css'

import styles from 'styles/checkbox.module.css'

const checkIcon = createElement(Check, { 'aria-hidden': 'true' }).outerHTML

const minusIcon = createElement(Minus, { 'aria-hidden': 'true' }).outerHTML

const checkbox = ({ label }: { label: string }) => /* html */ `
  <ark-checkbox>
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
  root.innerHTML = /* html */ `
  <div class="${field.Root}" data-inline>
    ${checkbox({ label: 'Label' })}
    <span class="${field.HelperText}">Additional Info</span>
    <span class="${field.ErrorText}" hidden>Error Info</span>
  </div>`
}
