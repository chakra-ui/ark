import '../../src/components/highlight/index.js'

import styles from 'styles/highlight.module.css'

export function mount(root: HTMLElement) {
  root.innerHTML = /* html */ `
    <p class="${styles.Text}">
      <ark-highlight query="component">Ark UI is a headless component library for building accessible web applications.</ark-highlight>
    </p>`
}
