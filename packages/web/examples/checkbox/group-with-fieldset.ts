import { createElement, Check, Minus } from 'lucide'

import '../../src/components/checkbox/index.js'
import '../../src/components/fieldset/index.js'

import fieldset from 'styles/fieldset.module.css'

import styles from 'styles/checkbox.module.css'

const frameworks = [
  { label: 'React', value: 'react' },
  { label: 'Solid', value: 'solid' },
  { label: 'Vue', value: 'vue' },
]

const checkbox = (attrs: string, label = 'Checkbox', indeterminate = false) => /* html */ `
  <ark-checkbox ${attrs}>
    <label class="${styles.Root}">
      <ark-checkbox-control class="${styles.Control}">
        <ark-checkbox-indicator class="${styles.Indicator}">${createElement(Check, { 'aria-hidden': 'true' }).outerHTML}</ark-checkbox-indicator>
        ${indeterminate ? /* html */ `<ark-checkbox-indicator class="${styles.Indicator}" indeterminate>${createElement(Minus, { 'aria-hidden': 'true' }).outerHTML}</ark-checkbox-indicator>` : ''}
      </ark-checkbox-control>
      <ark-checkbox-label class="${styles.Label}">${label}</ark-checkbox-label>
      <ark-checkbox-hidden-input></ark-checkbox-hidden-input>
    </label>
  </ark-checkbox>`

const group = (attrs: string, items = frameworks, indeterminate = false) => /* html */ `
  <ark-checkbox-group class="${styles.Group}" ${attrs}>
    ${items.map((item) => checkbox(`value="${item.value}"`, item.label, indeterminate)).join('')}
  </ark-checkbox-group>`

export function mount(root: HTMLElement) {
  root.innerHTML = /* html */ `
  <ark-fieldset>
    <fieldset class="${fieldset.Root}">
      <ark-fieldset-legend class="${fieldset.Legend}">Select frameworks</ark-fieldset-legend>
      <ark-fieldset-helper-text class="${fieldset.HelperText}">Choose your preferred frameworks</ark-fieldset-helper-text>
      ${group(`default-value="react" name="framework"`)}
    </fieldset>
  </ark-fieldset>`
}
