import '@ark-ui/web/number-flow'

import button from 'styles/button.module.css'
import styles from 'styles/number-flow.module.css'

export function mount(root: HTMLElement) {
  root.innerHTML = /* html */ `
  <div class="${styles.Card}">
    <span class="${styles.Label}">Downloads</span>
    <ark-number-flow class="${styles.Root} ${styles.Display}" default-value="31415" stagger="60ms">
      <ark-number-flow-segments></ark-number-flow-segments>
      <ark-number-flow-value-text></ark-number-flow-value-text>
    </ark-number-flow>
    <span class="${styles.Caption}">A slower spring with each digit trailing the one before it.</span>
    <div class="${styles.Actions}">
      <button type="button" class="${button.Root}" data-action="shuffle">Shuffle</button>
    </div>
  </div>`

  const flow = root.querySelector('ark-number-flow')!
  flow.spinTiming = { duration: '1400ms', easing: 'cubic-bezier(0.16, 1, 0.3, 1)' }
  flow.transformTiming = { duration: '700ms', easing: 'cubic-bezier(0.16, 1, 0.3, 1)' }
  root.querySelector('[data-action=shuffle]')!.addEventListener('click', () => {
    flow.value = Math.round(Math.random() * 999_999)
  })
}
