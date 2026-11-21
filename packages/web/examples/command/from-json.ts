import { createElement, Search } from 'lucide'

import '../../src/components/command/index.js'

import styles from 'styles/command.module.css'

const items = [
  { value: 'new-file', label: 'New file', group: 'File', keywords: ['create'] },
  { value: 'save', label: 'Save', group: 'File', keywords: ['write'] },
  { value: 'zoom-in', label: 'Zoom in', group: 'View', keywords: ['bigger'] },
  { value: 'zoom-out', label: 'Zoom out', group: 'View', keywords: ['smaller'] },
]

export function mount(root: HTMLElement) {
  root.innerHTML = /* html */ `
  <ark-command class="${styles.Root}">
    <script type="application/json">${JSON.stringify(items)}</script>
    <ark-command-label class="${styles.Label}">Commands</ark-command-label>
    <ark-command-control class="${styles.Control}">
      ${createElement(Search, { 'aria-hidden': 'true' }).outerHTML}
      <ark-command-input><input class="${styles.Input}" placeholder="Search..." aria-label="Search commands" /></ark-command-input>
    </ark-command-control>
    <ark-command-list class="${styles.List}">
      <template data-group>
        <ark-command-item-group class="${styles.ItemGroup}">
          <ark-command-item-group-label class="${styles.ItemGroupLabel}"></ark-command-item-group-label>
        </ark-command-item-group>
      </template>
      <template>
        <ark-command-item class="${styles.Item}">
          <ark-command-item-text class="${styles.ItemText}"></ark-command-item-text>
        </ark-command-item>
      </template>
    </ark-command-list>
    <ark-command-empty class="${styles.Empty}">No commands found</ark-command-empty>
  </ark-command>`
}
