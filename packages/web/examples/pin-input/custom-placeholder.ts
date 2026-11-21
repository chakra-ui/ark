import '../../src/components/pin-input/index.js'

import styles from 'styles/pin-input.module.css'

interface PinInputProps {
  count?: number
  label?: string
  placeholder?: string
}

const pinInput = ({ count = 3, label = 'Label', placeholder }: PinInputProps = {}) => /* html */ `
  <ark-pin-input class="${styles.Root}"${placeholder ? ` placeholder="${placeholder}"` : ''}>
    <ark-pin-input-label class="${styles.Label}">${label}</ark-pin-input-label>
    <ark-pin-input-control class="${styles.Control}">
      ${Array.from({ length: count }, () => /* html */ `<ark-pin-input-input><input class="${styles.Input}" /></ark-pin-input-input>`).join('')}
    </ark-pin-input-control>
    <ark-pin-input-hidden-input></ark-pin-input-hidden-input>
  </ark-pin-input>`

export function mount(root: HTMLElement) {
  root.innerHTML = pinInput({ placeholder: '*' })
}
