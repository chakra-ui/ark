import { createElement, Check } from 'lucide'

import { createListCollection } from '../../src/components/listbox/index.js'
import {
  createListVirtualizer,
  renderVirtualItems,
  spreadVirtualizerProps,
  type VirtualItem,
} from '../../src/components/virtualizer/index.js'

import styles from 'styles/listbox.module.css'

interface Row {
  value: string
  label: string
}

const ROW_HEIGHT = 40

const collection = createListCollection<Row>({
  items: Array.from({ length: 5000 }, (_, index) => ({ value: `item-${index + 1}`, label: `Item ${index + 1}` })),
})

const itemKey = (item: VirtualItem) => item.key

export function mount(root: HTMLElement) {
  root.innerHTML = /* html */ `
  <ark-listbox class="${styles.Root}">
    <ark-listbox-label class="${styles.Label}">Item</ark-listbox-label>
    <ark-listbox-content class="${styles.Content}">
      <ark-listbox-list class="${styles.Scroller}" manual>
        <div></div>
        <template>
          <ark-listbox-item class="${styles.Item}" style="height: ${ROW_HEIGHT}px; box-sizing: border-box">
            <ark-listbox-item-text class="${styles.ItemText}"></ark-listbox-item-text>
            <ark-listbox-item-indicator class="${styles.ItemIndicator}">${createElement(Check, { 'aria-hidden': 'true' }).outerHTML}</ark-listbox-item-indicator>
          </ark-listbox-item>
        </template>
      </ark-listbox-list>
    </ark-listbox-content>
  </ark-listbox>`

  const listbox = root.querySelector('ark-listbox')!
  const scroller = root.querySelector<HTMLElement>('ark-listbox-list')!
  const content = scroller.querySelector('div')!
  const template = scroller.querySelector('template')!

  const virtualizer = createListVirtualizer({
    count: collection.size,
    estimatedSize: () => ROW_HEIGHT,
    overscan: 10,
    observeScrollElementSize: true,
  })

  const createItem = (item: Row) => {
    const element = template.content.firstElementChild!.cloneNode(true) as HTMLElement
    element.setAttribute('value', item.value)
    element.querySelector('ark-listbox-item-text')!.textContent = item.label
    return element
  }

  const renderItem = (virtualItem: VirtualItem, element?: HTMLElement) => {
    const next = element ?? createItem(collection.items[virtualItem.index])
    spreadVirtualizerProps(next, { style: virtualizer.getItemStyle(virtualItem) })
    return next
  }

  const render = () => {
    scroller.style.setProperty('--total-size', `${virtualizer.getTotalSize()}px`)
    spreadVirtualizerProps(content, { style: virtualizer.getContentStyle() })

    renderVirtualItems(content, virtualizer.getVirtualItems(), itemKey, renderItem)
  }

  listbox.collection = collection
  listbox.scrollToIndexFn = ({ index }) => {
    virtualizer.scrollToIndex(index, { align: 'auto' })
  }

  spreadVirtualizerProps(scroller, { style: virtualizer.getContainerStyle() })
  virtualizer.subscribe(render)
  virtualizer.attach(scroller)
  render()
}
