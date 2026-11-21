import { createElement, Search } from 'lucide'

import '../../src/components/command/index.js'

import styles from 'styles/command.module.css'

const item = (value: string, label: string, disabled = false) => `
  <ark-command-item class="${styles.Item}" value="${value}" ${disabled ? 'disabled' : ''}>
    <ark-command-item-text class="${styles.ItemText}">${label}</ark-command-item-text>
  </ark-command-item>`

const group = (name: string, items: string) => `
  <ark-command-item-group class="${styles.ItemGroup}" name="${name}">
    <ark-command-item-group-label class="${styles.ItemGroupLabel}">${name}</ark-command-item-group-label>
    ${items}
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
      ${group('Suggestions', `${item('calendar', 'Calendar')}${item('emoji', 'Search emoji')}${item('calculator', 'Calculator', true)}`)}
      ${group('Settings', `${item('profile', 'Profile')}${item('billing', 'Billing')}${item('preferences', 'Preferences')}`)}
    </ark-command-list>
    <ark-command-empty class="${styles.Empty}">No results found</ark-command-empty>
  </ark-command>`
}
