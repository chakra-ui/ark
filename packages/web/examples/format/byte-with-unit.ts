import '@ark-ui/web/format'

import styles from 'styles/format.module.css'

export function mount(root: HTMLElement) {
  root.innerHTML = /* html */ `
    <div class="${styles.Inline}">
      <span class="${styles.InlineLabel}">File size:</span>
      <span class="${styles.InlineValue}"><ark-format-byte value="1450.45" unit="bit"></ark-format-byte></span>
    </div>`
}
