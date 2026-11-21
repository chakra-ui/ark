import { createElement, ChevronsUpDown, Check } from 'lucide'

import { createListCollection } from '../../src/components/select/index.js'
import {
  createListVirtualizer,
  renderVirtualItems,
  spreadVirtualizerProps,
  type VirtualItem,
} from '../../src/components/virtualizer/index.js'

import styles from 'styles/select.module.css'

interface Row {
  value: string
  label: string
}

const ROW_HEIGHT = 36

const collection = createListCollection<Row>({
  items: Array.from({ length: 5000 }, (_, index) => ({ value: `item-${index + 1}`, label: `Item ${index + 1}` })),
})

const itemKey = (item: VirtualItem) => item.key

export function mount(root: HTMLElement) {
  root.innerHTML = /* html */ `
  <ark-select class="${styles.Root}">
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
          <div class="${styles.Scroller}">
            <div></div>
          </div>
          <template>
            <ark-select-item class="${styles.Item}" style="height: ${ROW_HEIGHT}px; box-sizing: border-box">
              <ark-select-item-text class="${styles.ItemText}"></ark-select-item-text>
              <ark-select-item-indicator class="${styles.ItemIndicator}">${createElement(Check, { 'aria-hidden': 'true' }).outerHTML}</ark-select-item-indicator>
            </ark-select-item>
          </template>
        </ark-select-list>
      </ark-select-content>
    </ark-select-positioner>
  </ark-select>`

  const select = root.querySelector('ark-select')!
  // A plain element receives the list props, so it's the focused listbox and the scroller
  const scroller = root.querySelector<HTMLElement>('ark-select-list > div')!
  const content = scroller.querySelector('div')!
  const template = root.querySelector<HTMLTemplateElement>('ark-select-list > template')!

  const virtualizer = createListVirtualizer({
    count: collection.size,
    estimatedSize: () => ROW_HEIGHT,
    overscan: 10,
    observeScrollElementSize: true,
  })

  const createItem = (item: Row) => {
    const element = template.content.firstElementChild!.cloneNode(true) as HTMLElement
    element.setAttribute('value', item.value)
    element.querySelector('ark-select-item-text')!.textContent = item.label
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

  select.collection = collection
  select.scrollToIndexFn = ({ index }) => {
    virtualizer.scrollToIndex(index, { align: 'auto' })
  }

  spreadVirtualizerProps(scroller, { style: virtualizer.getContainerStyle() })
  virtualizer.subscribe(render)
  virtualizer.attach(scroller)
  render()
}
