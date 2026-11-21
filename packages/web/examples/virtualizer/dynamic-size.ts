import '@ark-ui/web/virtualizer'

import styles from 'styles/virtualizer.module.css'

const items = Array.from({ length: 10000 }, (_, index) => ({
  title: `Item ${index + 1}`,
  lines: Array.from({ length: (index % 4) + 1 }, (_, line) => `Line ${line + 1} of item ${index + 1}`),
}))

export function mount(root: HTMLElement) {
  root.innerHTML = /* html */ `
    <ark-list-virtualizer class="${styles.Root}" data-testid="list" count="${items.length}" estimated-size="64">
      <ark-list-virtualizer-content>
        <template><ark-list-virtualizer-item class="${styles.ItemDynamic}" measure></ark-list-virtualizer-item></template>
      </ark-list-virtualizer-content>
    </ark-list-virtualizer>`

  root.querySelector('ark-list-virtualizer')!.renderItem = (element, item) => {
    const { title, lines } = items[item.index]
    element.innerHTML = /* html */ `<strong>${title}</strong>${lines.map((line) => `<p>${line}</p>`).join('')}`
    element.classList.toggle(styles.ItemAlt, item.index % 2 === 1)
  }
}
