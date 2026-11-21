import '../../src/components/switch/index.js'

import styles from 'styles/switch.module.css'

const attr = (name: string, on?: boolean) => (on ? name : '')

const switchMarkup = ({ disabled }: { disabled?: boolean }) => /* html */ `
  <ark-switch ${attr('disabled', disabled)}>
    <label class="${styles.Root}">
      <ark-switch-control class="${styles.Control}"><ark-switch-thumb class="${styles.Thumb}"></ark-switch-thumb></ark-switch-control>
      <ark-switch-label class="${styles.Label}">Label</ark-switch-label>
      <ark-switch-hidden-input></ark-switch-hidden-input>
    </label>
  </ark-switch>`

export function mount(root: HTMLElement) {
  root.innerHTML = switchMarkup({ disabled: true })
}
