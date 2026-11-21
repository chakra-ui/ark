import '@ark-ui/web/pin-input'

import styles from 'styles/pin-input.module.css'

export function mount(root: HTMLElement) {
  root.innerHTML = /* html */ `
    <ark-pin-input class="${styles.Root}" placeholder="*">
      <ark-pin-input-label class="${styles.Label}">Label</ark-pin-input-label>
      <ark-pin-input-control class="${styles.Control}">
        ${Array.from({ length: 3 }, () => /* html */ `<ark-pin-input-input><input class="${styles.Input}" /></ark-pin-input-input>`).join('')}
      </ark-pin-input-control>
      <ark-pin-input-hidden-input></ark-pin-input-hidden-input>
    </ark-pin-input>`
}
