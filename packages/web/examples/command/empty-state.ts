import { createElement, Search } from 'lucide'

import '../../src/components/command/index.js'

import styles from 'styles/command.module.css'

const item = (value: string, label: string) => `
  <ark-command-item class="${styles.Item}" value="${value}">
    <ark-command-item-text class="${styles.ItemText}">${label}</ark-command-item-text>
  </ark-command-item>`

export function mount(root: HTMLElement) {
  root.innerHTML = /* html */ `
  <ark-command class="${styles.Root}" default-input-value="xyz">
    <ark-command-label class="${styles.Label}">Fruits</ark-command-label>
    <ark-command-control class="${styles.Control}">
      ${createElement(Search, { 'aria-hidden': 'true' }).outerHTML}
      <ark-command-input><input class="${styles.Input}" placeholder="Search fruits..." aria-label="Search fruits" /></ark-command-input>
    </ark-command-control>
    <ark-command-list class="${styles.List}">
      ${item('apple', 'Apple')}${item('banana', 'Banana')}${item('cherry', 'Cherry')}
    </ark-command-list>
    <ark-command-empty class="${styles.Empty}">No results for “<span></span>”</ark-command-empty>
  </ark-command>`

  const command = root.querySelector('ark-command')!
  const query = root.querySelector('ark-command-empty span')!
  query.textContent = 'xyz'
  command.addEventListener('inputvaluechange', (event) => {
    query.textContent = event.detail.inputValue
  })
}
