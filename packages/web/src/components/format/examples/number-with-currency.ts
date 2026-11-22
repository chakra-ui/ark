import '@ark-ui/web/format'

import styles from 'styles/format.module.css'

export function mount(root: HTMLElement) {
  root.innerHTML = /* html */ `
    <span class="${styles.Value}"><ark-format-number value="1234.45" style="currency" currency="USD"></ark-format-number></span>`
}
