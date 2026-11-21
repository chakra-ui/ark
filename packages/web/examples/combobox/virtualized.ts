import { createElement, ChevronsUpDown, Check } from 'lucide'

import { createListCollection, type ListCollection } from '../../src/components/combobox/index.js'
import { createFilter } from '../../src/utils/locale.js'
import {
  createListVirtualizer,
  renderVirtualItems,
  spreadVirtualizerProps,
  type VirtualItem,
} from '../../src/components/virtualizer/index.js'

import styles from 'styles/combobox.module.css'

const { contains } = createFilter({ sensitivity: 'base' })

interface Row {
  value: string
  label: string
}

const ROW_HEIGHT = 36

const all = createListCollection<Row>({
  items: Array.from({ length: 5000 }, (_, index) => ({ value: `item-${index + 1}`, label: `Item ${index + 1}` })),
})

const itemKey = (item: VirtualItem) => item.key

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
        <ark-combobox-list class="${styles.Scroller}" manual>
          <div></div>
          <template>
            <ark-combobox-item class="${styles.Item}" style="height: ${ROW_HEIGHT}px; box-sizing: border-box">
              <ark-combobox-item-text class="${styles.ItemText}"></ark-combobox-item-text>
              <ark-combobox-item-indicator class="${styles.ItemIndicator}">${createElement(Check, { 'aria-hidden': 'true' }).outerHTML}</ark-combobox-item-indicator>
            </ark-combobox-item>
          </template>
        </ark-combobox-list>
      </ark-combobox-content>
    </ark-combobox-positioner>
  </ark-combobox>`

  const combobox = root.querySelector('ark-combobox')!
  const scroller = root.querySelector<HTMLElement>('ark-combobox-list')!
  const content = scroller.querySelector('div')!
  const template = scroller.querySelector('template')!
  let collection: ListCollection<Row> = all

  const virtualizer = createListVirtualizer({
    count: collection.size,
    estimatedSize: () => ROW_HEIGHT,
    overscan: 10,
    observeScrollElementSize: true,
  })

  const createItem = (item: Row) => {
    const element = template.content.firstElementChild!.cloneNode(true) as HTMLElement
    element.setAttribute('value', item.value)
    element.querySelector('ark-combobox-item-text')!.textContent = item.label
    return element
  }

  const itemFor = (item: Row, element: HTMLElement | undefined) => {
    if (element?.getAttribute('value') === item.value) return element
    return createItem(item)
  }

  const renderItem = (virtualItem: VirtualItem, element?: HTMLElement) => {
    const next = itemFor(collection.items[virtualItem.index], element)
    spreadVirtualizerProps(next, { style: virtualizer.getItemStyle(virtualItem) })
    return next
  }

  const render = () => {
    scroller.style.setProperty('--total-size', `${virtualizer.getTotalSize()}px`)
    spreadVirtualizerProps(content, { style: virtualizer.getContentStyle() })

    renderVirtualItems(content, virtualizer.getVirtualItems(), itemKey, renderItem)
  }

  const show = (next: ListCollection<Row>) => {
    collection = next
    virtualizer.updateOptions({ count: collection.size })
    scroller.scrollTop = 0
    combobox.collection = collection
    render()
  }

  combobox.scrollToIndexFn = ({ index }) => {
    virtualizer.scrollToIndex(index, { align: 'auto' })
  }
  combobox.addEventListener('inputvaluechange', (event) => {
    if (event.detail.reason !== 'input-change') return
    const query = event.detail.inputValue.trim()
    show(all.filter((text) => contains(text, query)))
  })

  spreadVirtualizerProps(scroller, { style: virtualizer.getContainerStyle() })
  virtualizer.subscribe(render)
  virtualizer.attach(scroller)
  show(all)
}
