import { createElement, Search } from 'lucide'

import '../../src/components/command/index.js'

import styles from 'styles/command.module.css'

interface Item {
  value: string
  label: string
  disabled?: boolean
}

const suggestions: Item[] = [
  { value: 'calendar', label: 'Calendar' },
  { value: 'emoji', label: 'Search emoji' },
  { value: 'calculator', label: 'Calculator', disabled: true },
]

const settings: Item[] = [
  { value: 'profile', label: 'Profile' },
  { value: 'billing', label: 'Billing' },
  { value: 'preferences', label: 'Preferences' },
]

const attr = (name: string, on?: boolean) => (on ? name : '')

const item = ({ value, label, disabled }: Item) => /* html */ `
  <ark-command-item class="${styles.Item}" value="${value}" ${attr('disabled', disabled)}>
    <ark-command-item-text class="${styles.ItemText}">${label}</ark-command-item-text>
  </ark-command-item>`

const group = ({ name }: { name: string }, children: string[]) => /* html */ `
  <ark-command-item-group class="${styles.ItemGroup}" name="${name}">
    <ark-command-item-group-label class="${styles.ItemGroupLabel}">${name}</ark-command-item-group-label>
    ${children.join('')}
  </ark-command-item-group>`

export function mount(root: HTMLElement) {
  root.innerHTML = /* html */ `
  <ark-command class="${styles.Root}">
    <ark-command-label class="${styles.Label}">Commands</ark-command-label>
    <ark-command-control class="${styles.Control}">
      ${createElement(Search, { 'aria-hidden': 'true' }).outerHTML}
      <ark-command-input><input class="${styles.Input}" placeholder="Search..." aria-label="Search" /></ark-command-input>
    </ark-command-control>
    <ark-command-list class="${styles.List}">
      ${group(
        { name: 'Suggestions' },
        suggestions.map((entry) => item(entry)),
      )}
      ${group(
        { name: 'Settings' },
        settings.map((entry) => item(entry)),
      )}
    </ark-command-list>
    <ark-command-empty class="${styles.Empty}">No results found</ark-command-empty>
  </ark-command>`
}
