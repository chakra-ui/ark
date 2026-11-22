import '@ark-ui/web/format'

import styles from 'styles/format.module.css'

export function mount(root: HTMLElement) {
  root.innerHTML = /* html */ `
    <div class="${styles.Inline}">
      <span class="${styles.InlineLabel}">Support window</span>
      <span class="${styles.InlineValue}">
        <ark-format-time value="17:15:00" format="12h" am-label="morning" pm-label="evening"></ark-format-time>
      </span>
    </div>`
}
