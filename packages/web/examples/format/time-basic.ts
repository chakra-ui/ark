import '@ark-ui/web/format'

import styles from 'styles/format.module.css'

export function mount(root: HTMLElement) {
  root.innerHTML = /* html */ `
    <span class="${styles.Value}"><ark-format-time value="18:47:12" format="12h"></ark-format-time></span>`
}
