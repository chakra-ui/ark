import '@ark-ui/web/virtualizer'

import styles from 'styles/virtualizer.module.css'

const items = Array.from({ length: 10000 }, (_, index) => `Item ${index + 1}`)

export function mount(root: HTMLElement) {
  root.innerHTML = /* html */ `
    <ark-list-virtualizer class="${styles.Root}" data-testid="list" count="${items.length}" estimated-size="48">
      <ark-list-virtualizer-content>
        <template><ark-list-virtualizer-item class="${styles.Item}"></ark-list-virtualizer-item></template>
      </ark-list-virtualizer-content>
    </ark-list-virtualizer>`

  root.querySelector('ark-list-virtualizer')!.renderItem = (element, item) => {
    element.textContent = items[item.index]
    element.classList.toggle(styles.ItemAlt, item.index % 2 === 1)
  }
}
