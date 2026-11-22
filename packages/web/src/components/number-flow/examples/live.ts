import '@ark-ui/web/number-flow'

import button from 'styles/button.module.css'
import styles from 'styles/number-flow.module.css'

export function mount(root: HTMLElement) {
  root.innerHTML = /* html */ `
  <div class="${styles.Card}">
    <span class="${styles.Label}">Items in cart</span>
    <ark-number-flow class="${styles.Root} ${styles.Display}" default-value="3" live>
      <ark-number-flow-segments></ark-number-flow-segments>
      <ark-number-flow-value-text></ark-number-flow-value-text>
    </ark-number-flow>
    <span class="${styles.Caption}">Screen readers announce the count once it settles.</span>
    <div class="${styles.Actions}">
      <button type="button" class="${button.Root}" data-action="down">Remove</button>
      <button type="button" class="${button.Root}" data-variant="solid" data-action="up">Add</button>
    </div>
  </div>`

  const flow = root.querySelector('ark-number-flow')!
  root.querySelector('[data-action=down]')!.addEventListener('click', () => {
    flow.value = Math.max(0, flow.value - 1)
  })
  root.querySelector('[data-action=up]')!.addEventListener('click', () => {
    flow.value = flow.value + 1
  })
}
