import { type ConflictBehavior, createHotkeyStore, createHotkeys } from '@ark-ui/web/hotkeys'

import button from 'styles/button.module.css'
import styles from 'styles/hotkeys.module.css'

const BEHAVIORS: ConflictBehavior[] = ['warn', 'replace', 'allow']

export function mount(root: HTMLElement) {
  root.innerHTML = /* html */ `
  <div class="${styles.Panel}">
    <p class="${styles.Hint}">
      Two commands claim the same shortcut. Pick how the store resolves it, then press it.
    </p>

    <div class="${styles.Toolbar}">
      ${BEHAVIORS.map((value) => /* html */ `<button type="button" class="${button.Root}" value="${value}">${value}</button>`).join('')}
    </div>

    <div class="${styles.Section}">
      <span class="${styles.SectionLabel}">Registered on mod+K</span>
      <div class="${styles.KeyStrip}"></div>
    </div>

    <div class="${styles.Section}">
      <span class="${styles.SectionLabel}">Fired on last press</span>
      <span class="${styles.Badge}" data-fired-log></span>
    </div>
  </div>`

  const toggles = root.querySelectorAll('button')
  const registered = root.querySelector(`.${styles.KeyStrip}`)!
  const firedLog = root.querySelector('[data-fired-log]')!

  let destroy = () => {}

  const select = (behavior: ConflictBehavior) => {
    destroy()

    for (const toggle of toggles) toggle.toggleAttribute('data-selected', toggle.value === behavior)

    const store = createHotkeyStore({ conflictBehavior: behavior })
    const fired: string[] = []

    const renderFired = () => {
      firedLog.textContent = fired.slice(-2).join(' + ') || 'nothing yet'
      if (fired.length > 0) firedLog.setAttribute('data-state', 'active')
      else firedLog.removeAttribute('data-state')
    }

    const log = (name: string) => {
      fired.push(name)
      renderFired()
    }

    createHotkeys(
      [
        { id: 'first', hotkey: 'mod+K', label: 'First', action: () => log('First') },
        { id: 'second', hotkey: 'mod+K', label: 'Second', action: () => log('Second') },
      ],
      { store },
    )

    const commands = [...store.getState().commands.values()]

    registered.innerHTML =
      commands.length === 0
        ? /* html */ `<span class="${styles.Placeholder}">none</span>`
        : commands.map((command) => /* html */ `<span class="${styles.Badge}">${command.label}</span>`).join('')

    renderFired()

    destroy = () => store.destroy()
  }

  select('warn')

  for (const toggle of toggles) {
    toggle.addEventListener('click', () => select(toggle.value as ConflictBehavior))
  }
}
