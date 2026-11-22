import { createHotkey, getHotkeyStore } from '@ark-ui/web/hotkeys'

import styles from 'styles/hotkeys.module.css'

export function mount(root: HTMLElement) {
  root.innerHTML = /* html */ `
  <div class="${styles.Panel}">
    <p class="${styles.Hint}">Hold any key to see it tracked live</p>

    <div class="${styles.Section}">
      <span class="${styles.SectionLabel}">Currently pressed</span>
      <div class="${styles.KeyStrip}"></div>
    </div>

    <div class="${styles.Section}">
      <span class="${styles.SectionLabel}">Shift</span>
      <span class="${styles.Badge}"><span class="${styles.Dot}"></span><span></span></span>
    </div>
  </div>`

  const strip = root.querySelector(`.${styles.KeyStrip}`)!
  const badge = root.querySelector(`.${styles.Badge}`)!
  const dot = badge.querySelector(`.${styles.Dot}`)!
  const status = badge.lastElementChild!

  createHotkey('mod+K', () => {}, { id: 'key-state' })

  const store = getHotkeyStore()

  const renderPressedKeys = () => {
    const keys = store.getCurrentlyPressed()

    if (keys.length === 0) {
      strip.innerHTML = /* html */ `<span class="${styles.Placeholder}">nothing</span>`
      return
    }

    strip.replaceChildren(
      ...keys.map((key) => {
        const kbd = document.createElement('kbd')
        kbd.className = styles.Kbd
        kbd.toggleAttribute('data-active', true)
        kbd.textContent = key
        return kbd
      }),
    )
  }

  const renderShift = () => {
    const pressed = store.isPressed('shift')
    if (pressed) badge.setAttribute('data-state', 'active')
    else badge.removeAttribute('data-state')
    dot.toggleAttribute('data-pulse', pressed)
    status.textContent = pressed ? 'Precision mode' : 'Hold Shift for precision'
  }

  renderPressedKeys()
  renderShift()

  store.subscribe((state) => state.pressedKeys, renderPressedKeys)
  store.subscribe(() => store.isPressed('shift'), renderShift)
}
