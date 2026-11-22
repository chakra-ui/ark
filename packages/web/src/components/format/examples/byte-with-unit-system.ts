import '@ark-ui/web/format'

import styles from 'styles/format.module.css'

export function mount(root: HTMLElement) {
  root.innerHTML = /* html */ `
    <div class="${styles.List}">
      <div class="${styles.ListItem}">
        <span class="${styles.InlineLabel}">Decimal (1000 bytes):</span>
        <span class="${styles.InlineValue}"><ark-format-byte value="1024" unit-system="decimal"></ark-format-byte></span>
      </div>
      <div class="${styles.ListItem}">
        <span class="${styles.InlineLabel}">Binary (1024 bytes):</span>
        <span class="${styles.InlineValue}"><ark-format-byte value="1024" unit-system="binary"></ark-format-byte></span>
      </div>
    </div>`
}
