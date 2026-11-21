import { createElement, Check } from 'lucide'

import '../../src/components/listbox/index.js'

import styles from 'styles/listbox.module.css'

interface ListboxProps {
  label: string
  selectionMode: 'single' | 'multiple' | 'extended'
  defaultValue: string[]
}

const listbox = ({ label, selectionMode, defaultValue }: ListboxProps, children: string[]) => /* html */ `
  <ark-listbox class="${styles.Root}" selection-mode="${selectionMode}" default-value="${defaultValue.join(',')}">
    <ark-listbox-label class="${styles.Label}">${label}</ark-listbox-label>
    <ark-listbox-content class="${styles.Content}">
      <ark-listbox-list class="${styles.List}">${children.join('')}</ark-listbox-list>
    </ark-listbox-content>
  </ark-listbox>`

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
  root.innerHTML = listbox(
    {
      label: /* html */ `Colors: <ark-listbox-value-text class="${styles.ValueText}"></ark-listbox-value-text>`,
      selectionMode: 'multiple',
      defaultValue: ['red', 'blue'],
    },
    colors.map((color) => item(color)),
  )
}
