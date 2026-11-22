import '@ark-ui/web/format'

import styles from 'styles/format.module.css'

export function mount(root: HTMLElement) {
  root.innerHTML = /* html */ `
    <span class="${styles.Value}" lang="ar-EG"><ark-format-time value="13:05" format="12h"></ark-format-time></span>`
}
