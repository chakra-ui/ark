import { createElement, Check, Minus } from 'lucide'

import '../../src/components/checkbox/index.js'

import styles from 'styles/checkbox.module.css'

const frameworks = [
  { label: 'React', value: 'react' },
  { label: 'Solid', value: 'solid' },
  { label: 'Vue', value: 'vue' },
]

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

const group = (attrs: string, items = frameworks, indeterminate = false) => `
  <ark-checkbox-group class="${styles.Group}" ${attrs}>
    ${items.map((item) => checkbox(`value="${item.value}"`, item.label, indeterminate)).join('')}
  </ark-checkbox-group>`

export function mount(root: HTMLElement) {
  root.innerHTML = group(`default-value="react" max-selected="2" name="framework"`, [
    ...frameworks,
    { label: 'Svelte', value: 'svelte' },
  ])
}
