import { createElement, Check } from 'lucide'

import '@ark-ui/web/listbox'

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

const colors: Item[] = ['Red', 'Blue', 'Green', 'Yellow', 'Purple'].map((label) => ({
  label,
  value: label.toLowerCase(),
}))

export function mount(root: HTMLElement) {
  root.innerHTML = /* html */ `
  <ark-listbox class="${styles.Root}" selection-mode="multiple" default-value="red,blue">
    <ark-listbox-label class="${styles.Label}">Colors: <ark-listbox-value-text class="${styles.ValueText}"></ark-listbox-value-text></ark-listbox-label>
    <ark-listbox-content class="${styles.Content}">
      <ark-listbox-list class="${styles.List}">${colors.map((color) => item(color)).join('')}</ark-listbox-list>
    </ark-listbox-content>
  </ark-listbox>`
}
