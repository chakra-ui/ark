import '@ark-ui/web/format'

import styles from 'styles/format.module.css'

export function mount(root: HTMLElement) {
  root.innerHTML = /* html */ `
    <div class="${styles.Inline}">
      <span class="${styles.InlineLabel}">Last sync</span>
      <span class="${styles.InlineValue}"><ark-format-time value="03:07:19" format="12h" with-seconds></ark-format-time></span>
    </div>`
}
