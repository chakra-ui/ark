import '@ark-ui/web/virtualizer'

import styles from 'styles/virtualizer.module.css'

const items = Array.from({ length: 10000 }, (_, index) => `Item ${index + 1}`)

export function mount(root: HTMLElement) {
  root.innerHTML = /* html */ `
    <ark-window-virtualizer class="${styles.Window}" data-testid="window" count="${items.length}" estimated-size="48">
      <ark-window-virtualizer-content>
        <template><ark-window-virtualizer-item class="${styles.Item}"></ark-window-virtualizer-item></template>
      </ark-window-virtualizer-content>
    </ark-window-virtualizer>`

  root.querySelector('ark-window-virtualizer')!.renderItem = (element, item) => {
    element.textContent = items[item.index]
    element.classList.toggle(styles.ItemAlt, item.index % 2 === 1)
  }
}
