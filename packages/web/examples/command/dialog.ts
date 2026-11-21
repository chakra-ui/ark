import { createElement, CornerDownLeft, FilePlus, FolderOpen, Save, Search, Settings, Terminal } from 'lucide'

import '../../src/components/command/index.js'
import '../../src/components/dialog/index.js'

import button from 'styles/button.module.css'
import styles from 'styles/command.module.css'

type IconNode = Parameters<typeof createElement>[0]

const icon = (node: IconNode) => createElement(node, { 'aria-hidden': 'true' }).outerHTML

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
  { value: 'terminal', label: 'Toggle terminal', icon: Terminal, shortcut: '⌃`' },
  { value: 'settings', label: 'Open settings', icon: Settings, shortcut: '⌘,' },
]

const hints = [
  { key: '↑↓', label: 'Navigate' },
  { key: icon(CornerDownLeft), label: 'Run' },
  { key: 'esc', label: 'Close' },
]

const item = ({ value, label, icon: node, shortcut }: CommandItem) => /* html */ `
  <ark-command-item class="${styles.Item}" value="${value}">
    <span class="${styles.ItemStart}">${icon(node)}<ark-command-item-text class="${styles.ItemText}">${label}</ark-command-item-text></span>
    <kbd class="${styles.Shortcut}">${shortcut}</kbd>
  </ark-command-item>`

const hint = ({ key, label }: { key: string; label: string }) => /* html */ `
  <span class="${styles.FooterHint}"><kbd class="${styles.Shortcut}">${key}</kbd> ${label}</span>`

export function mount(root: HTMLElement) {
  root.innerHTML = /* html */ `
  <output>Ran: nothing yet</output>
  <ark-dialog>
    <ark-dialog-trigger><button class="${button.Root}">Search commands <kbd>⌘K</kbd></button></ark-dialog-trigger>
    <ark-dialog-backdrop class="${styles.Backdrop}"></ark-dialog-backdrop>
    <ark-dialog-positioner class="${styles.Positioner}">
      <ark-dialog-content class="${styles.Content}" aria-label="Command palette">
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
        </ark-command>
        <div class="${styles.Footer}">
          ${hints.map((entry) => hint(entry)).join('')}
        </div>
      </ark-dialog-content>
    </ark-dialog-positioner>
  </ark-dialog>`

  const dialog = root.querySelector('ark-dialog')!
  const command = root.querySelector('ark-command')!
  const output = root.querySelector('output')!

  root.ownerDocument.addEventListener('keydown', (event) => {
    if (event.key.toLowerCase() !== 'k' || !(event.metaKey || event.ctrlKey)) return
    event.preventDefault()
    dialog.api?.setOpen(!dialog.api.open)
  })

  command.addEventListener('itemselect', (event) => {
    output.textContent = `Ran: ${event.detail.itemValue}`
    dialog.api?.setOpen(false)
  })

  dialog.addEventListener('openchange', (event) => {
    if (!event.detail.open) command.api?.setInputValue('')
  })
}
