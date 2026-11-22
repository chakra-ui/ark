import '@ark-ui/web/format'

import styles from 'styles/format.module.css'

export function mount(root: HTMLElement) {
  root.innerHTML = /* html */ `
    <div class="${styles.Root}">
      <span class="${styles.ValueLarge}">
        <ark-format-number value="1500000" notation="compact" compact-display="short"></ark-format-number>
      </span>
      <span class="${styles.Label}">downloads per month</span>
    </div>`
}
