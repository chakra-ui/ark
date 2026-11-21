import { createElement, Copy, FilePlus, FolderOpen, Save, Search, Settings } from 'lucide'

import '../../src/components/command/index.js'

import styles from 'styles/command.module.css'

type IconNode = Parameters<typeof createElement>[0]

interface CommandItem {
  value: string
  label: string
  icon: IconNode
  shortcut: string
}

const commands: CommandItem[] = [
  { value: 'new-file', label: 'New file', icon: FilePlus, shortcut: '⌘N' },
  { value: 'open-file', label: 'Open file', icon: FolderOpen, shortcut: '⌘O' },
  { value: 'save', label: 'Save', icon: Save, shortcut: '⌘S' },
  { value: 'copy-path', label: 'Copy path', icon: Copy, shortcut: '⌥⌘C' },
  { value: 'settings', label: 'Open settings', icon: Settings, shortcut: '⌘,' },
]

const icon = (node: IconNode) => createElement(node, { 'aria-hidden': 'true' }).outerHTML

const item = ({ value, label, icon: node, shortcut }: CommandItem) => /* html */ `
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
      ${commands.map((command) => item(command)).join('')}
    </ark-command-list>
    <ark-command-empty class="${styles.Empty}">No commands found</ark-command-empty>
  </ark-command>`

  const command = root.querySelector('ark-command')!
  const output = root.querySelector('output')!
  command.addEventListener('itemselect', (event) => {
    output.textContent = `Selected: ${event.detail.itemValue}`
  })
}
