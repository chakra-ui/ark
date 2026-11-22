import '@ark-ui/web/format'

import styles from 'styles/format.module.css'

const unitDisplays = ['narrow', 'short', 'long']

export function mount(root: HTMLElement) {
  root.innerHTML = /* html */ `
    <div class="${styles.List}">
      ${unitDisplays
        .map(
          (unitDisplay) => /* html */ `
            <div class="${styles.ListItem}">
              <span class="${styles.InlineLabel}">${unitDisplay}:</span>
              <span class="${styles.Value}"><ark-format-byte value="50345.53" unit-display="${unitDisplay}"></ark-format-byte></span>
            </div>`,
        )
        .join('')}
    </div>`
}
