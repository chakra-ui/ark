import '@ark-ui/web/format'

import styles from 'styles/format.module.css'

export function mount(root: HTMLElement) {
  root.innerHTML = /* html */ `
    <span class="${styles.Value}" lang="de-DE"><ark-format-number value="1450.45"></ark-format-number></span>`
}
