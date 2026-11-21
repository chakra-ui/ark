import '../../src/components/switch/index.js'

import styles from 'styles/switch.module.css'

export function mount(root: HTMLElement) {
  root.innerHTML = /* html */ `
    <ark-switch default-checked>
      <label class="${styles.Root}">
        <ark-switch-control class="${styles.Control}"><ark-switch-thumb class="${styles.Thumb}"></ark-switch-thumb></ark-switch-control>
        <ark-switch-label class="${styles.Label}">Label</ark-switch-label>
        <ark-switch-hidden-input></ark-switch-hidden-input>
      </label>
    </ark-switch>`
}
