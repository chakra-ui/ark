import { createHotkeyRecorder } from '@ark-ui/web/hotkeys'

import button from 'styles/button.module.css'
import styles from 'styles/hotkeys.module.css'

export function mount(root: HTMLElement) {
  root.innerHTML = /* html */ `
  <div class="${styles.Panel}">
    <p class="${styles.Hint}">
      Click record, then press a shortcut. <kbd class="${styles.Kbd}">Esc</kbd> cancels,
      <kbd class="${styles.Kbd}">Backspace</kbd> clears.
    </p>

    <div class="${styles.Toolbar}">
      <button type="button" class="${button.Root}">Record shortcut</button>
      <span class="${styles.Badge}" data-state="active" hidden>
        <span class="${styles.Dot}" data-pulse></span>
        <span>Press a key</span>
      </span>
    </div>

    <div class="${styles.Section}">
      <span class="${styles.SectionLabel}">Bound to</span>
      <div class="${styles.KeyStrip}">
        <kbd class="${styles.Kbd}" data-active hidden></kbd>
        <span class="${styles.Placeholder}">nothing yet</span>
      </div>
    </div>

    <div class="${styles.Section}">
      <span class="${styles.SectionLabel}">Last event</span>
      <span class="${styles.Badge}" data-last-event>none</span>
    </div>
  </div>`

  const trigger = root.querySelector('button')!
  const listening = root.querySelector(`.${styles.Toolbar} .${styles.Badge}`)!
  const binding = root.querySelector(`.${styles.KeyStrip} kbd`)!
  const placeholder = root.querySelector(`.${styles.Placeholder}`)!
  const lastEvent = root.querySelector('[data-last-event]')!

  const setBinding = (display: string | null) => {
    binding.textContent = display
    binding.toggleAttribute('hidden', !display)
    placeholder.toggleAttribute('hidden', !!display)
  }

  const recorder = createHotkeyRecorder({
    onRecord: (hotkey) => {
      setBinding(hotkey.display)
      lastEvent.textContent = 'recorded'
    },
    onCancel: () => {
      lastEvent.textContent = 'cancelled'
    },
    onClear: () => {
      setBinding(null)
      lastEvent.textContent = 'cleared'
    },
  })

  recorder.subscribe(({ recording, value }) => {
    trigger.disabled = recording
    trigger.textContent = recording ? 'Listening…' : 'Record shortcut'
    listening.toggleAttribute('hidden', !recording)
    listening.lastElementChild!.textContent = value?.display ?? 'Press a key'
  })

  trigger.addEventListener('click', () => recorder.start())
}
