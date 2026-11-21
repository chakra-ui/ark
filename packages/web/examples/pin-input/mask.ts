import '../../src/components/pin-input/index.js'

import styles from 'styles/pin-input.module.css'

const attr = (name: string, on?: boolean) => (on ? name : '')

interface PinInputProps {
  count?: number
  label?: string
  mask?: boolean
}

const pinInput = ({ count = 3, label = 'Label', mask }: PinInputProps = {}) => /* html */ `
  <ark-pin-input class="${styles.Root}" ${attr('mask', mask)}>
    <ark-pin-input-label class="${styles.Label}">${label}</ark-pin-input-label>
    <ark-pin-input-control class="${styles.Control}">
      ${Array.from({ length: count }, () => /* html */ `<ark-pin-input-input><input class="${styles.Input}" /></ark-pin-input-input>`).join('')}
    </ark-pin-input-control>
    <ark-pin-input-hidden-input></ark-pin-input-hidden-input>
  </ark-pin-input>`

export function mount(root: HTMLElement) {
  root.innerHTML = pinInput({ mask: true })
}
