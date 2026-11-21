import '../../src/components/pin-input/index.js'

import styles from 'styles/pin-input.module.css'

const input = () => /* html */ `<ark-pin-input-input><input class="${styles.Input}" /></ark-pin-input-input>`

export function mount(root: HTMLElement) {
  root.innerHTML = /* html */ `
  <ark-pin-input type="alphanumeric" class="${styles.Root}" >
    <ark-pin-input-label class="${styles.Label}">Label</ark-pin-input-label>
    <ark-pin-input-control class="${styles.Control}">
      ${Array.from({ length: 3 }, () => input()).join('')}
    </ark-pin-input-control>
    <ark-pin-input-hidden-input></ark-pin-input-hidden-input>
  </ark-pin-input>`
  const pin = root.querySelector('ark-pin-input')!
  pin.normalizeValue = (value) => value.toUpperCase()
}
