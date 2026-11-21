import '../../src/components/highlight/index.js'

import styles from 'styles/highlight.module.css'

export function mount(root: HTMLElement) {
  root.innerHTML = /* html */ `
    <p class="${styles.Text}">
      <ark-highlight>Ark UI provides React, Solid, Vue, and Svelte components that are accessible and customizable.</ark-highlight>
    </p>`

  root.querySelector('ark-highlight')!.query = ['React', 'Vue']
}
