import { createElement, Check } from 'lucide'

import '../../src/components/listbox/index.js'

import styles from 'styles/listbox.module.css'

const listbox = (attrs: string, label: string, list: string, data = '') => `
  <ark-listbox class="${styles.Root}" ${attrs}>
    ${data}
    <ark-listbox-label class="${styles.Label}">${label}</ark-listbox-label>
    <ark-listbox-content class="${styles.Content}">
      <ark-listbox-list class="${styles.List}">${list}</ark-listbox-list>
    </ark-listbox-content>
  </ark-listbox>`

const item = (value = '', label = '') => `
  <ark-listbox-item class="${styles.Item}" ${value ? `value="${value}"` : ''}>
    <ark-listbox-item-text class="${styles.ItemText}">${label}</ark-listbox-item-text>
    <ark-listbox-item-indicator class="${styles.ItemIndicator}">${createElement(Check, { 'aria-hidden': 'true' }).outerHTML}</ark-listbox-item-indicator>
  </ark-listbox-item>`

const options = (items: { value: string; label: string; disabled?: boolean }[]) =>
  items
    .map((it) =>
      item(it.value, it.label).replace('<ark-listbox-item ', `<ark-listbox-item ${it.disabled ? 'disabled ' : ''}`),
    )
    .join('')

export function mount(root: HTMLElement) {
  root.innerHTML = listbox(
    '',
    'Select Plan',
    options([
      { label: 'Free', value: 'free' },
      { label: 'Pro', value: 'pro' },
      { label: 'Enterprise', value: 'enterprise', disabled: true },
      { label: 'Custom', value: 'custom' },
    ]),
  )
}
