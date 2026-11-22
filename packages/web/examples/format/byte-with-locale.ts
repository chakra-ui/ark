import '@ark-ui/web/format'

import styles from 'styles/format.module.css'

const locales = ['de-DE', 'zh-CN']

export function mount(root: HTMLElement) {
  root.innerHTML = /* html */ `
    <div class="${styles.List}">
      ${locales
        .map(
          (locale) => /* html */ `
            <div class="${styles.ListItem}" lang="${locale}">
              <span class="${styles.InlineLabel}">${locale}:</span>
              <span class="${styles.Value}"><ark-format-byte value="1450.45"></ark-format-byte></span>
            </div>`,
        )
        .join('')}
    </div>`
}
