import '@ark-ui/web/format'

import styles from 'styles/format.module.css'

export function mount(root: HTMLElement) {
  root.innerHTML = /* html */ `
    <div class="${styles.Inline}">
      <span class="${styles.InlineLabel}">Boarding</span>
      <span class="${styles.InlineValue}"><ark-format-time value="2026-02-27T18:45:34"></ark-format-time></span>
    </div>`
}
