import { createElement, ChevronsUpDown, Check } from 'lucide'

import { createListCollection } from '@ark-ui/web/select'
import '@ark-ui/web/virtualizer'

import styles from 'styles/select.module.css'

const ROW_HEIGHT = 36

const collection = createListCollection({
  items: Array.from({ length: 5000 }, (_, index) => ({ value: `item-${index + 1}`, label: `Item ${index + 1}` })),
})

export function mount(root: HTMLElement) {
  root.innerHTML = /* html */ `
    <ark-select class="${styles.Root}" name="item">
      <ark-select-label class="${styles.Label}">Item</ark-select-label>
      <ark-select-control class="${styles.Control}">
        <ark-select-trigger>
          <button class="${styles.Trigger}">
            <ark-select-value-text class="${styles.ValueText}" placeholder="Select an item"></ark-select-value-text>
          </button>
        </ark-select-trigger>
        <div class="${styles.Indicators}">
          <ark-select-indicator class="${styles.Indicator}">${createElement(ChevronsUpDown, { 'aria-hidden': 'true' }).outerHTML}</ark-select-indicator>
        </div>
      </ark-select-control>
      <ark-select-positioner class="${styles.Positioner}">
        <ark-select-content class="${styles.Content}">
          <ark-select-list as-child manual>
            <ark-list-virtualizer class="${styles.Scroller}" count="${collection.size}" estimated-size="${ROW_HEIGHT}" overscan="10">
              <ark-list-virtualizer-content>
                <template>
                  <ark-list-virtualizer-item as-child>
                    <ark-select-item class="${styles.Item}" style="height: ${ROW_HEIGHT}px; box-sizing: border-box">
                      <ark-select-item-text class="${styles.ItemText}"></ark-select-item-text>
                      <ark-select-item-indicator class="${styles.ItemIndicator}">${createElement(Check, { 'aria-hidden': 'true' }).outerHTML}</ark-select-item-indicator>
                    </ark-select-item>
                  </ark-list-virtualizer-item>
                </template>
              </ark-list-virtualizer-content>
            </ark-list-virtualizer>
          </ark-select-list>
        </ark-select-content>
      </ark-select-positioner>
      <ark-select-hidden-input></ark-select-hidden-input>
    </ark-select>`

  const select = root.querySelector('ark-select')!
  const list = root.querySelector('ark-list-virtualizer')!

  list.renderItem = (element, item) => {
    const { value, label } = collection.items[item.index]
    element.setAttribute('value', value)
    element.querySelector('ark-select-item-text')!.textContent = label
  }

  select.collection = collection
  select.scrollToIndexFn = ({ index }) => list.virtualizer?.scrollToIndex(index, { align: 'auto' })
}
