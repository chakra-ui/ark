import '@ark-ui/web/format'

import styles from 'styles/format.module.css'

export function mount(root: HTMLElement) {
  root.innerHTML = /* html */ `
    <span class="${styles.Value}"><ark-format-number value="384.4" style="unit" unit="kilometer"></ark-format-number></span>`
}
