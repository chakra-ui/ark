import { createElement, Check } from 'lucide'

import { createListCollection } from '@ark-ui/web/listbox'
import '@ark-ui/web/virtualizer'

import styles from 'styles/listbox.module.css'

const ROW_HEIGHT = 40

const collection = createListCollection({
  items: Array.from({ length: 5000 }, (_, index) => ({ value: `item-${index + 1}`, label: `Item ${index + 1}` })),
})

export function mount(root: HTMLElement) {
  root.innerHTML = /* html */ `
    <ark-listbox class="${styles.Root}">
      <ark-listbox-label class="${styles.Label}">Item</ark-listbox-label>
      <ark-listbox-content class="${styles.Content}">
        <ark-listbox-list as-child manual>
          <ark-list-virtualizer class="${styles.Scroller}" count="${collection.size}" estimated-size="${ROW_HEIGHT}" overscan="10">
            <ark-list-virtualizer-content>
              <template>
                <ark-list-virtualizer-item as-child>
                  <ark-listbox-item class="${styles.Item}" style="height: ${ROW_HEIGHT}px; box-sizing: border-box">
                    <ark-listbox-item-text class="${styles.ItemText}"></ark-listbox-item-text>
                    <ark-listbox-item-indicator class="${styles.ItemIndicator}">${createElement(Check, { 'aria-hidden': 'true' }).outerHTML}</ark-listbox-item-indicator>
                  </ark-listbox-item>
                </ark-list-virtualizer-item>
              </template>
            </ark-list-virtualizer-content>
          </ark-list-virtualizer>
        </ark-listbox-list>
      </ark-listbox-content>
    </ark-listbox>`

  const listbox = root.querySelector('ark-listbox')!
  const list = root.querySelector('ark-list-virtualizer')!

  list.renderItem = (element, item) => {
    const { value, label } = collection.items[item.index]
    element.setAttribute('value', value)
    element.querySelector('ark-listbox-item-text')!.textContent = label
  }

  listbox.collection = collection
  listbox.scrollToIndexFn = ({ index }) => list.virtualizer?.scrollToIndex(index, { align: 'auto' })
}
