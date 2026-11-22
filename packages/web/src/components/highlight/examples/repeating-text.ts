import '@ark-ui/web/highlight'

import styles from 'styles/highlight.module.css'

export function mount(root: HTMLElement) {
  root.innerHTML = /* html */ `
    <p class="${styles.Text}">
      <ark-highlight query="@ark-ui.com" match-all>Contact us at support@ark-ui.com or sales@ark-ui.com for assistance.</ark-highlight>
    </p>`
}
