import { createElement, Check } from 'lucide'

import '@ark-ui/web/listbox'

import styles from 'styles/listbox.module.css'

const group = ({ name, label }: { name: string; label: string }, children: string[]) => /* html */ `
  <ark-listbox-item-group class="${styles.ItemGroup}" name="${name}">
    <ark-listbox-item-group-label class="${styles.ItemGroupLabel}">${label}</ark-listbox-item-group-label>
    ${children.join('')}
  </ark-listbox-item-group>`

interface Item {
  value: string
  label: string
}

const item = ({ value, label }: Item) => /* html */ `
  <ark-listbox-item class="${styles.Item}" value="${value}">
    <ark-listbox-item-text class="${styles.ItemText}">${label}</ark-listbox-item-text>
    <ark-listbox-item-indicator class="${styles.ItemIndicator}">${createElement(Check, { 'aria-hidden': 'true' }).outerHTML}</ark-listbox-item-indicator>
  </ark-listbox-item>`

export function mount(root: HTMLElement) {
  root.innerHTML = /* html */ `
  <ark-listbox class="${styles.Root}">
    <ark-listbox-label class="${styles.Label}">Select Region</ark-listbox-label>
    <ark-listbox-content class="${styles.Content}">
      <ark-listbox-list class="${styles.List}">
        ${group({ name: 'na', label: 'North America' }, [
          item({ value: 'nyc', label: 'New York' }),
          item({ value: 'tor', label: 'Toronto' }),
        ])}
        ${group({ name: 'eu', label: 'Europe' }, [
          item({ value: 'lon', label: 'London' }),
          item({ value: 'ber', label: 'Berlin' }),
        ])}
      </ark-listbox-list>
    </ark-listbox-content>
  </ark-listbox>`
}
