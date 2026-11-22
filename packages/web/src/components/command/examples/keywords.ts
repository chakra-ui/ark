import { createElement, Search } from 'lucide'

import '@ark-ui/web/command'

import styles from 'styles/command.module.css'

interface Item {
  value: string
  label: string
  keywords: string
}

const commands: Item[] = [
  { value: 'theme', label: 'Toggle theme', keywords: 'dark, light, appearance' },
  { value: 'sign-out', label: 'Sign out', keywords: 'logout, exit' },
  { value: 'shortcuts', label: 'Keyboard shortcuts', keywords: 'hotkeys, keybindings' },
]

const item = ({ value, label, keywords }: Item) => /* html */ `
  <ark-command-item class="${styles.Item}" value="${value}" keywords="${keywords}">
    <ark-command-item-text class="${styles.ItemText}">${label}</ark-command-item-text>
  </ark-command-item>`

export function mount(root: HTMLElement) {
  root.innerHTML = /* html */ `
  <ark-command class="${styles.Root}">
    <ark-command-label class="${styles.Label}">Commands</ark-command-label>
    <ark-command-control class="${styles.Control}">
      ${createElement(Search, { 'aria-hidden': 'true' }).outerHTML}
      <ark-command-input><input class="${styles.Input}" placeholder="Try “dark” or “logout”..." aria-label="Search commands" /></ark-command-input>
    </ark-command-control>
    <ark-command-list class="${styles.List}">
      ${commands.map((command) => item(command)).join('')}
    </ark-command-list>
    <ark-command-empty class="${styles.Empty}">No commands found</ark-command-empty>
  </ark-command>`
}
