import '@ark-ui/web/format'

import styles from 'styles/format.module.css'

export function mount(root: HTMLElement) {
  root.innerHTML = /* html */ `
    <div class="${styles.Inline}">
      <span class="${styles.InlineLabel}">Edited</span>
      <span class="${styles.InlineValue}"><ark-format-relative-time value="2025-05-05" style="short"></ark-format-relative-time></span>
    </div>`
}
