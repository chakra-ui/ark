import { createElement, Check } from 'lucide'

import '../../src/components/listbox/index.js'

import styles from 'styles/listbox.module.css'

interface Item {
  value: string
  label: string
}

const item = ({ value, label }: Item) => /* html */ `
  <ark-listbox-item class="${styles.Item}" value="${value}">
    <ark-listbox-item-text class="${styles.ItemText}">${label}</ark-listbox-item-text>
    <ark-listbox-item-indicator class="${styles.ItemIndicator}">${createElement(Check, { 'aria-hidden': 'true' }).outerHTML}</ark-listbox-item-indicator>
  </ark-listbox-item>`

const sizes: Item[] = [
  { value: 'sm', label: 'Small' },
  { value: 'md', label: 'Medium' },
  { value: 'lg', label: 'Large' },
  { value: 'xl', label: 'Extra Large' },
]

export function mount(root: HTMLElement) {
  root.innerHTML = /* html */ `
    <div class="stack">
      <output>Value: ["md"]</output>
  <ark-listbox class="${styles.Root}" value="md">
    <ark-listbox-label class="${styles.Label}">Select Size</ark-listbox-label>
    <ark-listbox-content class="${styles.Content}">
      <ark-listbox-list class="${styles.List}">${sizes.map((entry) => item(entry)).join('')}</ark-listbox-list>
    </ark-listbox-content>
  </ark-listbox>
    </div>`
  const el = root.querySelector('ark-listbox')!
  el.addEventListener('valuechange', (event) => {
    const value = event.detail.value
    el.setAttribute('value', value.join(','))
    root.querySelector('output')!.textContent = `Value: ${JSON.stringify(value)}`
  })
}
