import '@ark-ui/web/format'

import styles from 'styles/format.module.css'

export function mount(root: HTMLElement) {
  root.innerHTML = /* html */ `
    <div class="${styles.Root}">
      <span class="${styles.Label}">File size</span>
      <span class="${styles.Value}"><ark-format-byte value="120000"></ark-format-byte></span>
    </div>`
}
