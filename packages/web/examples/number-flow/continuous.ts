import '@ark-ui/web/number-flow'

import button from 'styles/button.module.css'
import styles from 'styles/number-flow.module.css'

export function mount(root: HTMLElement) {
  root.innerHTML = /* html */ `
  <div class="${styles.Card}">
    <span class="${styles.Label}">Points</span>
    <ark-number-flow class="${styles.Root} ${styles.Display}" default-value="120" continuous>
      <ark-number-flow-segments></ark-number-flow-segments>
      <ark-number-flow-value-text></ark-number-flow-value-text>
    </ark-number-flow>
    <span class="${styles.Caption}">Every digit spins through the values in between.</span>
    <div class="${styles.Actions}">
      <button type="button" class="${button.Root}" data-action="small">+12</button>
      <button type="button" class="${button.Root}" data-action="large">+125</button>
      <button type="button" class="${button.Root}" data-action="reset">Reset</button>
    </div>
  </div>`

  const flow = root.querySelector('ark-number-flow')!
  root.querySelector('[data-action=small]')!.addEventListener('click', () => {
    flow.value = flow.value + 12
  })
  root.querySelector('[data-action=large]')!.addEventListener('click', () => {
    flow.value = flow.value + 125
  })
  root.querySelector('[data-action=reset]')!.addEventListener('click', () => {
    flow.value = 120
  })
}
