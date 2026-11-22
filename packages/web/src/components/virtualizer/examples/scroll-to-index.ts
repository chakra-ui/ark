import '@ark-ui/web/virtualizer'

import styles from 'styles/virtualizer.module.css'

const items = Array.from({ length: 10000 }, (_, index) => `Item ${index + 1}`)

const targets = { top: 0, middle: Math.floor(items.length / 2), bottom: items.length - 1 }

export function mount(root: HTMLElement) {
  root.innerHTML = /* html */ `
    <div>
      <div class="${styles.Controls}">
        ${Object.keys(targets)
          .map(
            (target) =>
              /* html */ `<button type="button" class="${styles.Trigger}" data-scroll="${target}">Scroll to ${target}</button>`,
          )
          .join('')}
      </div>
      <ark-list-virtualizer class="${styles.Root}" data-testid="list" count="${items.length}" estimated-size="48">
        <ark-list-virtualizer-content>
          <template><ark-list-virtualizer-item class="${styles.Item}"></ark-list-virtualizer-item></template>
        </ark-list-virtualizer-content>
      </ark-list-virtualizer>
    </div>`

  const list = root.querySelector('ark-list-virtualizer')!

  list.renderItem = (element, item) => {
    element.textContent = items[item.index]
    element.classList.toggle(styles.ItemAlt, item.index % 2 === 1)
  }

  for (const button of root.querySelectorAll<HTMLButtonElement>('[data-scroll]')) {
    const index = targets[button.dataset.scroll as keyof typeof targets]
    button.addEventListener('click', () => list.virtualizer?.scrollToIndex(index, { align: 'center' }))
  }
}
