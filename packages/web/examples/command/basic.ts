import { createElement, Copy, FilePlus, FolderOpen, Save, Search, Settings } from 'lucide'

import '../../src/components/command/index.js'

import styles from 'styles/command.module.css'

const icon = (node: Parameters<typeof createElement>[0]) => createElement(node, { 'aria-hidden': 'true' }).outerHTML

const item = (value: string, label: string, node: Parameters<typeof createElement>[0], shortcut: string) => `
  <ark-command-item class="${styles.Item}" value="${value}">
    <span class="${styles.ItemStart}">${icon(node)}<ark-command-item-text class="${styles.ItemText}">${label}</ark-command-item-text></span>
    <kbd class="${styles.Shortcut}">${shortcut}</kbd>
  </ark-command-item>`

export function mount(root: HTMLElement) {
  root.innerHTML = /* html */ `
  <output>Selected: none</output>
  <ark-command class="${styles.Root}">
    <ark-command-label class="${styles.Label}">Commands</ark-command-label>
    <ark-command-control class="${styles.Control}">
      ${icon(Search)}
      <ark-command-input><input class="${styles.Input}" placeholder="Type a command or search..." aria-label="Search commands" /></ark-command-input>
    </ark-command-control>
    <ark-command-list class="${styles.List}">
      ${item('new-file', 'New file', FilePlus, '⌘N')}
      ${item('open-file', 'Open file', FolderOpen, '⌘O')}
      ${item('save', 'Save', Save, '⌘S')}
      ${item('copy-path', 'Copy path', Copy, '⌥⌘C')}
      ${item('settings', 'Open settings', Settings, '⌘,')}
    </ark-command-list>
    <ark-command-empty class="${styles.Empty}">No commands found</ark-command-empty>
  </ark-command>`

  const command = root.querySelector('ark-command')!
  const output = root.querySelector('output')!
  command.addEventListener('itemselect', (event) => {
    output.textContent = `Selected: ${event.detail.itemValue}`
  })
}
