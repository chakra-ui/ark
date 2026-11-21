import '@ark-ui/web/highlight'

import styles from 'styles/highlight.module.css'

export function mount(root: HTMLElement) {
  root.innerHTML = /* html */ `
    <p class="${styles.Text}">
      <ark-highlight query="typescript" ignore-case>TypeScript provides static type checking. Using typescript helps catch errors early in development.</ark-highlight>
    </p>`
}
