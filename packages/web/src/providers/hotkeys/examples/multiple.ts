import { createHotkeys, formatHotkey, getPlatform } from '@ark-ui/web/hotkeys'

import styles from 'styles/hotkeys.module.css'

const commands = [
  { id: 'save', hotkey: 'mod+S', label: 'Save', category: 'File' },
  { id: 'undo', hotkey: 'mod+Z', label: 'Undo', category: 'Edit' },
  { id: 'redo', hotkey: 'mod+shift+Z', label: 'Redo', category: 'Edit' },
]

export function mount(root: HTMLElement) {
  root.innerHTML = /* html */ `
  <div class="${styles.Panel}">
    <div class="${styles.Toolbar}">
      <span class="${styles.SectionLabel}">Detected platform</span>
      <span class="${styles.Badge}">${getPlatform()}</span>
    </div>
    <ul class="${styles.List}">
      ${commands
        .map(
          (command) => /* html */ `
          <li class="${styles.Row}" data-id="${command.id}">
            <span>${command.label}</span>
            <kbd class="${styles.Kbd}">${formatHotkey(command.hotkey)}</kbd>
          </li>`,
        )
        .join('')}
    </ul>
  </div>`

  const rows = root.querySelectorAll<HTMLElement>(`.${styles.Row}`)

  createHotkeys(
    commands.map((command) => ({
      ...command,
      action: () => {
        for (const row of rows) {
          const fired = row.dataset.id === command.id
          row.toggleAttribute('data-fired', fired)
          row.querySelector('kbd')!.toggleAttribute('data-active', fired)
        }
      },
    })),
  )
}
