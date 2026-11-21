import '../../src/components/highlight/index.js'

import field from 'styles/field.module.css'
import styles from 'styles/highlight.module.css'

export function mount(root: HTMLElement) {
  root.innerHTML = /* html */ `
    <div class="${styles.Root}">
      <input class="${field.Input}" type="text" placeholder="Search text..." value="component" />
      <p class="${styles.Text}">
        <ark-highlight query="component">With Ark UI, you can build accessible, custom components. Each component is fully typed and works seamlessly with React, Solid, Svelte, and Vue.</ark-highlight>
      </p>
    </div>`

  const highlight = root.querySelector('ark-highlight')!

  root.querySelector('input')!.addEventListener('input', (event) => {
    highlight.query = (event.target as HTMLInputElement).value
  })
}
