import '@ark-ui/web/highlight'

import styles from 'styles/highlight.module.css'

const text = 'The checkbox component renders a box element. Use combobox for autocomplete.'

export function mount(root: HTMLElement) {
  root.innerHTML = /* html */ `
    <div class="${styles.Root}">
      <div class="${styles.Section}">
        <span class="${styles.Label}">Partial Match</span>
        <p class="${styles.Text}"><ark-highlight query="box" match-all>${text}</ark-highlight></p>
      </div>
      <div class="${styles.Section}">
        <span class="${styles.Label}">Exact Match</span>
        <p class="${styles.Text}"><ark-highlight query="box" match-all exact-match>${text}</ark-highlight></p>
      </div>
    </div>`
}
