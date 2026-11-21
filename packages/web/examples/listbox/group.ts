import { createElement, Check } from 'lucide'

import '../../src/components/listbox/index.js'

import styles from 'styles/listbox.module.css'

const listbox = (attrs: string, label: string, list: string, data = '') => /* html */ `
  <ark-listbox class="${styles.Root}" ${attrs}>
    ${data}
    <ark-listbox-label class="${styles.Label}">${label}</ark-listbox-label>
    <ark-listbox-content class="${styles.Content}">
      <ark-listbox-list class="${styles.List}">${list}</ark-listbox-list>
    </ark-listbox-content>
  </ark-listbox>`

const group = (name: string, label: string, items: string) => /* html */ `
  <ark-listbox-item-group class="${styles.ItemGroup}" name="${name}">
    <ark-listbox-item-group-label class="${styles.ItemGroupLabel}">${label}</ark-listbox-item-group-label>
    ${items}
  </ark-listbox-item-group>`

const item = (value = '', label = '') => /* html */ `
  <ark-listbox-item class="${styles.Item}" ${value ? `value="${value}"` : ''}>
    <ark-listbox-item-text class="${styles.ItemText}">${label}</ark-listbox-item-text>
    <ark-listbox-item-indicator class="${styles.ItemIndicator}">${createElement(Check, { 'aria-hidden': 'true' }).outerHTML}</ark-listbox-item-indicator>
  </ark-listbox-item>`

export function mount(root: HTMLElement) {
  root.innerHTML = listbox(
    '',
    'Select Region',
    group('na', 'North America', item('nyc', 'New York') + item('tor', 'Toronto')) +
      group('eu', 'Europe', item('lon', 'London') + item('ber', 'Berlin')),
  )
}
