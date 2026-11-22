import { createElement, ChevronsUpDown, Check } from 'lucide'

import { createListCollection } from '@ark-ui/web/combobox'
import { createFilter } from '@ark-ui/web/locale'
import '@ark-ui/web/virtualizer'

import styles from 'styles/combobox.module.css'

const { contains } = createFilter({ sensitivity: 'base' })

const ROW_HEIGHT = 36

const all = createListCollection({
  items: Array.from({ length: 5000 }, (_, index) => ({ value: `item-${index + 1}`, label: `Item ${index + 1}` })),
})

export function mount(root: HTMLElement) {
  root.innerHTML = /* html */ `
    <ark-combobox class="${styles.Root}" filter="none">
      <ark-combobox-label class="${styles.Label}">Item</ark-combobox-label>
      <ark-combobox-control class="${styles.Control}">
        <ark-combobox-input><input class="${styles.Input}" placeholder="e.g. Item 4200" /></ark-combobox-input>
        <div class="${styles.Indicators}">
          <ark-combobox-trigger><button class="${styles.Trigger}">${createElement(ChevronsUpDown, { 'aria-hidden': 'true' }).outerHTML}</button></ark-combobox-trigger>
        </div>
      </ark-combobox-control>
      <ark-combobox-positioner class="${styles.Positioner}">
        <ark-combobox-content class="${styles.Content}">
          <ark-combobox-empty class="${styles.Empty}">No items found</ark-combobox-empty>
          <ark-combobox-list as-child manual>
            <ark-list-virtualizer class="${styles.Scroller}" count="${all.size}" estimated-size="${ROW_HEIGHT}" overscan="10">
              <ark-list-virtualizer-content>
                <template>
                  <ark-list-virtualizer-item as-child>
                    <ark-combobox-item class="${styles.Item}" style="height: ${ROW_HEIGHT}px; box-sizing: border-box">
                      <ark-combobox-item-text class="${styles.ItemText}"></ark-combobox-item-text>
                      <ark-combobox-item-indicator class="${styles.ItemIndicator}">${createElement(Check, { 'aria-hidden': 'true' }).outerHTML}</ark-combobox-item-indicator>
                    </ark-combobox-item>
                  </ark-list-virtualizer-item>
                </template>
              </ark-list-virtualizer-content>
            </ark-list-virtualizer>
          </ark-combobox-list>
        </ark-combobox-content>
      </ark-combobox-positioner>
    </ark-combobox>`

  const combobox = root.querySelector('ark-combobox')!
  const list = root.querySelector('ark-list-virtualizer')!
  let collection = all

  list.options = { indexToKey: (index) => collection.items[index].value }

  list.renderItem = (element, item) => {
    const { value, label } = collection.items[item.index]
    element.setAttribute('value', value)
    element.querySelector('ark-combobox-item-text')!.textContent = label
  }

  combobox.collection = collection
  combobox.scrollToIndexFn = ({ index }) => list.virtualizer?.scrollToIndex(index, { align: 'auto' })

  combobox.addEventListener('inputvaluechange', (event) => {
    if (event.detail.reason !== 'input-change') return

    const query = event.detail.inputValue.trim()
    collection = all.filter((text) => contains(text, query))

    combobox.collection = collection
    list.count = collection.size
    list.scrollTop = 0
  })
}
