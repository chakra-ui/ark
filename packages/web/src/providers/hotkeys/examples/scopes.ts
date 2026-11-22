import { createHotkeyStore, createHotkeys, formatHotkey } from '@ark-ui/web/hotkeys'

import button from 'styles/button.module.css'
import styles from 'styles/hotkeys.module.css'

const commands = [
  { id: 'bold', hotkey: 'mod+B', label: 'Bold', scope: 'editor' },
  { id: 'print', hotkey: 'mod+P', label: 'Print', scope: 'reader' },
]

const store = createHotkeyStore({ activeScopes: ['editor'] })

export function mount(root: HTMLElement) {
  root.innerHTML = /* html */ `
  <div class="${styles.Panel}">
    <p class="${styles.Hint}">Only commands in the active scope respond</p>

    <div class="${styles.Toolbar}">
      <button type="button" class="${button.Root}">Switch scope</button>
      <span class="${styles.Badge}" data-state="active"></span>
    </div>

    <ul class="${styles.List}">
      ${commands
        .map(
          (command) => /* html */ `
          <li class="${styles.Row}" data-id="${command.id}" data-scope="${command.scope}">
            <span>${command.label} <span class="${styles.MetricLabel}">· ${command.scope}</span></span>
            <kbd class="${styles.Kbd}">${formatHotkey(command.hotkey)}</kbd>
          </li>`,
        )
        .join('')}
    </ul>
  </div>`

  const badge = root.querySelector(`.${styles.Badge}`)!
  const rows = root.querySelectorAll<HTMLElement>(`.${styles.Row}`)

  const setFired = (id: string | null) => {
    for (const row of rows) {
      const fired = row.dataset.id === id
      row.toggleAttribute('data-fired', fired)
      row.querySelector('kbd')!.toggleAttribute('data-active', fired)
    }
  }

  const setScope = (scope: string) => {
    store.setScope(scope)
    badge.textContent = scope
    setFired(null)

    for (const row of rows) {
      row.querySelector('span')!.style.opacity = row.dataset.scope === scope ? '1' : '0.45'
    }
  }

  setScope('editor')

  createHotkeys(
    commands.map((command) => ({
      id: command.id,
      hotkey: command.hotkey,
      scopes: [command.scope],
      action: () => setFired(command.id),
    })),
    { store },
  )

  root.querySelector('button')!.addEventListener('click', () => {
    setScope(badge.textContent === 'editor' ? 'reader' : 'editor')
  })
}
