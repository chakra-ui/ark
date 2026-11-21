import '@ark-ui/web/highlight'

import styles from 'styles/highlight.module.css'

const text = 'Each component follows WAI-ARIA guidelines. Every component is rigorously tested to ensure accessibility.'

export function mount(root: HTMLElement) {
  root.innerHTML = /* html */ `
    <div class="${styles.Root}">
      <div class="${styles.Section}">
        <span class="${styles.Label}">Match All</span>
        <p class="${styles.Text}"><ark-highlight query="component" match-all>${text}</ark-highlight></p>
      </div>
      <div class="${styles.Section}">
        <span class="${styles.Label}">Match First Only</span>
        <p class="${styles.Text}"><ark-highlight query="component">${text}</ark-highlight></p>
      </div>
    </div>`
}
