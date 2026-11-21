import { createElement, Search } from 'lucide'

import '../../src/components/command/index.js'

import styles from 'styles/command.module.css'

const item = (value: string, label: string, keywords: string) => /* html */ `
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
      ${item('theme', 'Toggle theme', 'dark, light, appearance')}
      ${item('sign-out', 'Sign out', 'logout, exit')}
      ${item('shortcuts', 'Keyboard shortcuts', 'hotkeys, keybindings')}
    </ark-command-list>
    <ark-command-empty class="${styles.Empty}">No commands found</ark-command-empty>
  </ark-command>`
}
