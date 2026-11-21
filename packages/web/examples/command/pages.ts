import { ChevronRight, createElement, Search } from 'lucide'

import '../../src/components/command/index.js'

import styles from 'styles/command.module.css'

const chevron = () => createElement(ChevronRight, { 'aria-hidden': 'true' }).outerHTML

const item = (value: string, label: string, parent = '', page = false) => `
  <ark-command-item class="${styles.Item}" value="${value}" ${parent ? `parent="${parent}"` : ''}>
    <ark-command-item-text class="${styles.ItemText}">${label}</ark-command-item-text>
    ${page ? chevron() : ''}
  </ark-command-item>`

export function mount(root: HTMLElement) {
  root.innerHTML = /* html */ `
  <output>Selected: none</output>
  <ark-command class="${styles.Root}">
    <ark-command-label class="${styles.Label}">Settings</ark-command-label>
    <div class="${styles.Breadcrumb}"><button type="button">Home</button><span hidden>${chevron()}<button type="button"></button></span></div>
    <ark-command-control class="${styles.Control}">
      ${createElement(Search, { 'aria-hidden': 'true' }).outerHTML}
      <ark-command-input><input class="${styles.Input}" placeholder="Search settings..." aria-label="Search settings" /></ark-command-input>
    </ark-command-control>
    <ark-command-list class="${styles.List}">
      ${item('theme', 'Change theme', '', true)}
      ${item('language', 'Change language', '', true)}
      ${item('sign-out', 'Sign out')}
      ${item('light', 'Light', 'theme')}
      ${item('dark', 'Dark', 'theme')}
      ${item('system', 'System', 'theme')}
      ${item('english', 'English', 'language')}
      ${item('french', 'French', 'language')}
    </ark-command-list>
    <ark-command-empty class="${styles.Empty}">No results found</ark-command-empty>
  </ark-command>`

  const command = root.querySelector('ark-command')!
  const output = root.querySelector('output')!
  const input = root.querySelector('input')!
  const [home, current] = root.querySelectorAll<HTMLButtonElement>(`.${styles.Breadcrumb} button`)

  home.addEventListener('click', () => {
    command.page = null
  })

  command.addEventListener('pagechange', (event) => {
    const { item } = event.detail
    current.parentElement!.hidden = !item
    current.textContent = item?.label ?? ''
    input.placeholder = item ? 'Search... (Backspace to go back)' : 'Search settings...'
  })

  command.addEventListener('itemselect', (event) => {
    output.textContent = `Selected: ${event.detail.itemValue}`
  })
}
