import { createElement, CornerDownLeft, FilePlus, FolderOpen, Save, Search, Settings, Terminal } from 'lucide'

import '../../src/components/command/index.js'
import '../../src/components/dialog/index.js'

import button from 'styles/button.module.css'
import styles from 'styles/command.module.css'

const icon = (node: Parameters<typeof createElement>[0]) => createElement(node, { 'aria-hidden': 'true' }).outerHTML

const item = (value: string, label: string, node: Parameters<typeof createElement>[0], shortcut: string) => `
  <ark-command-item class="${styles.Item}" value="${value}">
    <span class="${styles.ItemStart}">${icon(node)}<ark-command-item-text class="${styles.ItemText}">${label}</ark-command-item-text></span>
    <kbd class="${styles.Shortcut}">${shortcut}</kbd>
  </ark-command-item>`

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
            ${item('new-file', 'New file', FilePlus, '⌘N')}
            ${item('open-file', 'Open file', FolderOpen, '⌘O')}
            ${item('save', 'Save', Save, '⌘S')}
            ${item('terminal', 'Toggle terminal', Terminal, '⌃`')}
            ${item('settings', 'Open settings', Settings, '⌘,')}
          </ark-command-list>
          <ark-command-empty class="${styles.Empty}">No commands found</ark-command-empty>
        </ark-command>
        <div class="${styles.Footer}">
          <span class="${styles.FooterHint}"><kbd class="${styles.Shortcut}">↑↓</kbd> Navigate</span>
          <span class="${styles.FooterHint}"><kbd class="${styles.Shortcut}">${icon(CornerDownLeft)}</kbd> Run</span>
          <span class="${styles.FooterHint}"><kbd class="${styles.Shortcut}">esc</kbd> Close</span>
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
