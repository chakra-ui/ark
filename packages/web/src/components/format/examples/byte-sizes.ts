import '@ark-ui/web/format'

import styles from 'styles/format.module.css'

const sizes = [50, 5000, 5000000, 5000000000]

export function mount(root: HTMLElement) {
  root.innerHTML = /* html */ `
    <div class="${styles.List}">
      ${sizes
        .map(
          (size) => /* html */ `
            <div class="${styles.ListItem}">
              <span class="${styles.Value}"><ark-format-byte value="${size}"></ark-format-byte></span>
            </div>`,
        )
        .join('')}
    </div>`
}
