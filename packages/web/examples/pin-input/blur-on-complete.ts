import '../../src/components/pin-input/index.js'

import styles from 'styles/pin-input.module.css'

const pinInput = (attrs: string, count = 3, label = 'Label') => `
  <ark-pin-input class="${styles.Root}" ${attrs}>
    <ark-pin-input-label class="${styles.Label}">${label}</ark-pin-input-label>
    <ark-pin-input-control class="${styles.Control}">
      ${Array.from({ length: count }, () => `<ark-pin-input-input><input class="${styles.Input}" /></ark-pin-input-input>`).join('')}
    </ark-pin-input-control>
    <ark-pin-input-hidden-input></ark-pin-input-hidden-input>
  </ark-pin-input>`

export function mount(root: HTMLElement) {
  const host = document.createElement('div')
  host.innerHTML = pinInput('')
  host
    .querySelector('ark-pin-input')!
    .addEventListener('valuecomplete', () => (document.activeElement as HTMLElement | null)?.blur())
  root.replaceChildren(host)
}
