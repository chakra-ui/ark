import { CornerDownLeft, createElement, Search } from 'lucide'

import '@ark-ui/web/command'
import '@ark-ui/web/dialog'

import { createHotkey, createHotkeyStore, createHotkeys, formatHotkey } from '@ark-ui/web/hotkeys'

import button from 'styles/button.module.css'
import styles from 'styles/command-palette.module.css'

const store = createHotkeyStore()

export function mount(root: HTMLElement) {
  const run = (label: string) => {
    root.querySelector('output')!.textContent = label
  }

  const openPalette = () => root.querySelector('ark-dialog')!.api?.setOpen(true)

  createHotkeys(
    [
      {
        id: 'save',
        hotkey: 'mod+S',
        action: () => run('Save file'),
        label: 'Save file',
        category: 'File',
        keywords: ['write', 'persist'],
      },
      {
        id: 'theme',
        hotkey: 'mod+shift+D',
        action: () => run('Toggle theme'),
        label: 'Toggle theme',
        category: 'View',
        keywords: ['dark', 'light', 'appearance'],
      },
      {
        id: 'undo',
        hotkey: 'mod+Z',
        action: () => run('Undo'),
        label: 'Undo',
        category: 'Edit',
        keywords: ['revert', 'back'],
      },
    ],
    { store },
  )

  createHotkey('mod+shift+P', openPalette, {
    id: 'open-palette',
    label: 'Open command palette',
    category: 'General',
    store,
  })

  const commands = [...store.getState().commands.values()]
  const categories = [...new Set(commands.map((entry) => entry.category ?? 'Other'))]

  const groups = categories
    .map(
      (category) => /* html */ `
      <ark-command-item-group class="${styles.ItemGroup}" name="${category}">
        <ark-command-item-group-label class="${styles.ItemGroupLabel}">${category}</ark-command-item-group-label>
        ${commands
          .filter((entry) => (entry.category ?? 'Other') === category)
          .map(
            (entry) => /* html */ `
            <ark-command-item class="${styles.Item}" value="${entry.id}" keywords="${entry.keywords.join(', ')}">
              <ark-command-item-text class="${styles.ItemText}">${entry.label ?? entry.id}</ark-command-item-text>
              <kbd class="${styles.Shortcut}">${formatHotkey(entry.hotkey)}</kbd>
            </ark-command-item>`,
          )
          .join('')}
      </ark-command-item-group>`,
    )
    .join('')

  root.innerHTML = /* html */ `
  <div>
    <button type="button" class="${button.Root}">Open palette (${formatHotkey('mod+shift+P')})</button>
    <p>Last run: <output>nothing yet</output></p>

    <ark-dialog>
      <ark-dialog-backdrop class="${styles.Backdrop}"></ark-dialog-backdrop>
      <ark-dialog-positioner class="${styles.Positioner}">
        <ark-dialog-content class="${styles.Content}" aria-label="Command palette">
          <ark-command class="${styles.Root}" placeholder="Search commands…">
            <ark-command-control class="${styles.Control}">
              ${createElement(Search, { 'aria-hidden': 'true' }).outerHTML}
              <ark-command-input><input class="${styles.Input}" aria-label="Search commands" /></ark-command-input>
            </ark-command-control>
            <ark-command-list class="${styles.Content_list}">${groups}</ark-command-list>
            <ark-command-empty class="${styles.Empty}">No commands found</ark-command-empty>
          </ark-command>
          <div class="${styles.Footer}">
            <span class="${styles.FooterHint}">
              ${createElement(CornerDownLeft, { width: 12, height: 12, 'aria-hidden': 'true' }).outerHTML} to run
            </span>
            <span class="${styles.FooterHint}">esc to close</span>
          </div>
        </ark-dialog-content>
      </ark-dialog-positioner>
    </ark-dialog>
  </div>`

  const dialog = root.querySelector('ark-dialog')!
  const command = root.querySelector('ark-command')!

  root.querySelector('button')!.addEventListener('click', openPalette)

  command.addEventListener('itemselect', (event) => {
    const selected = store.getState().commands.get(event.detail.itemValue)
    if (!selected) return
    dialog.api?.setOpen(false)
    selected.action(new KeyboardEvent('keydown'))
  })

  dialog.addEventListener('openchange', (event) => {
    if (!event.detail.open) command.api?.setInputValue('')
  })
}
