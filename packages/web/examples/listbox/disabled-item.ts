import { createElement, Check } from 'lucide'

import '../../src/components/listbox/index.js'

import styles from 'styles/listbox.module.css'

const attr = (name: string, on?: boolean) => (on ? name : '')

interface ListboxProps {
  label: string
}

const listbox = ({ label }: ListboxProps, children: string[]) => /* html */ `
  <ark-listbox class="${styles.Root}">
    <ark-listbox-label class="${styles.Label}">${label}</ark-listbox-label>
    <ark-listbox-content class="${styles.Content}">
      <ark-listbox-list class="${styles.List}">${children.join('')}</ark-listbox-list>
    </ark-listbox-content>
  </ark-listbox>`

interface Item {
  value: string
  label: string
  disabled?: boolean
}

const item = ({ value, label, disabled }: Item) => /* html */ `
  <ark-listbox-item class="${styles.Item}" ${attr('disabled', disabled)} value="${value}">
    <ark-listbox-item-text class="${styles.ItemText}">${label}</ark-listbox-item-text>
    <ark-listbox-item-indicator class="${styles.ItemIndicator}">${createElement(Check, { 'aria-hidden': 'true' }).outerHTML}</ark-listbox-item-indicator>
  </ark-listbox-item>`

const plans: Item[] = [
  { label: 'Free', value: 'free' },
  { label: 'Pro', value: 'pro' },
  { label: 'Enterprise', value: 'enterprise', disabled: true },
  { label: 'Custom', value: 'custom' },
]

export function mount(root: HTMLElement) {
  root.innerHTML = listbox(
    { label: 'Select Plan' },
    plans.map((plan) => item(plan)),
  )
}
