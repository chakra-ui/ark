import '@ark-ui/web/format'

import styles from 'styles/format.module.css'

export function mount(root: HTMLElement) {
  root.innerHTML = /* html */ `
    <span class="${styles.Value}">
      <ark-format-number value="0.145" style="percent" minimum-fraction-digits="2" maximum-fraction-digits="2"></ark-format-number>
    </span>`
}
