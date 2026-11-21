import '../../src/components/pin-input/index.js'

import styles from 'styles/pin-input.module.css'

export function mount(root: HTMLElement) {
  root.innerHTML = /* html */ `
  <ark-pin-input class="${styles.Root}" >
    <ark-pin-input-label class="${styles.Label}">Label</ark-pin-input-label>
    <ark-pin-input-control class="${styles.Control}">
      <ark-pin-input-input><input class="${styles.Input}" /></ark-pin-input-input><ark-pin-input-input><input class="${styles.Input}" /></ark-pin-input-input><ark-pin-input-input><input class="${styles.Input}" /></ark-pin-input-input>
    </ark-pin-input-control>
    <ark-pin-input-hidden-input></ark-pin-input-hidden-input>
  </ark-pin-input>`
}
