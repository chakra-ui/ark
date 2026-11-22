import { createHotkeys, formatHotkey } from '@ark-ui/web/hotkeys'

import styles from 'styles/hotkeys.module.css'

export function mount(root: HTMLElement) {
  root.innerHTML = /* html */ `
  <div class="${styles.Panel}">
    <p class="${styles.Hint}">Try each shortcut outside the field, then again with the field focused</p>

    <input class="${styles.Input}" placeholder="Type here…" aria-label="Note" />

    <ul class="${styles.List}">
      <li class="${styles.Row}">
        <span>Search <span class="${styles.MetricLabel}">· ignored while typing</span></span>
        <kbd class="${styles.Kbd}">${formatHotkey('S')}</kbd>
      </li>
      <li class="${styles.Row}">
        <span>Save <span class="${styles.MetricLabel}">· modifiers always fire</span></span>
        <kbd class="${styles.Kbd}">${formatHotkey('mod+S')}</kbd>
      </li>
      <li class="${styles.Row}">
        <span>Preview <span class="${styles.MetricLabel}">· enableOnFormTags</span></span>
        <kbd class="${styles.Kbd}">${formatHotkey('P')}</kbd>
      </li>
    </ul>

    <div class="${styles.Section}">
      <span class="${styles.SectionLabel}">Last fired</span>
      <span class="${styles.Badge}">nothing yet</span>
    </div>
  </div>`

  const badge = root.querySelector(`.${styles.Badge}`)!

  const log = (message: string) => {
    badge.textContent = message
    badge.setAttribute('data-state', 'active')
  }

  createHotkeys([
    { id: 'search', hotkey: 'S', action: () => log('Search (single key)') },
    { id: 'save-note', hotkey: 'mod+S', action: () => log('Save (modifier)') },
    {
      id: 'preview',
      hotkey: 'P',
      action: () => log('Preview (opted in)'),
      options: { enableOnFormTags: true },
    },
  ])
}
