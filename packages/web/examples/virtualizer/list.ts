import {
  createListVirtualizer,
  renderVirtualItems,
  spreadVirtualizerProps,
  type VirtualItem,
} from '../../src/components/virtualizer/index.js'

import styles from 'styles/virtualizer.module.css'

const items = Array.from({ length: 10000 }, (_, index) => `Item ${index + 1}`)

const itemClass = (index: number) => (index % 2 ? `${styles.Item} ${styles.ItemAlt}` : styles.Item)

const itemKey = (item: VirtualItem) => item.key

export function mount(root: HTMLElement) {
  root.innerHTML = /* html */ `
  <div class="${styles.Root}" data-testid="list">
    <div></div>
  </div>`

  const scroller = root.querySelector<HTMLElement>('[data-testid="list"]')!
  const content = scroller.querySelector('div')!

  const virtualizer = createListVirtualizer({
    count: items.length,
    estimatedSize: () => 48,
    observeScrollElementSize: true,
  })

  const renderItem = (item: VirtualItem, element?: HTMLElement) => {
    const next = element ?? document.createElement('div')
    next.className = itemClass(item.index)
    next.dataset.index = String(item.index)
    next.textContent = items[item.index]
    spreadVirtualizerProps(next, {
      ...virtualizer.getItemAriaAttrs(item.index),
      style: virtualizer.getItemStyle(item),
    })
    return next
  }

  const render = () => {
    spreadVirtualizerProps(content, { style: virtualizer.getContentStyle() })
    renderVirtualItems(content, virtualizer.getVirtualItems(), itemKey, renderItem)
  }

  spreadVirtualizerProps(scroller, {
    ...virtualizer.getContainerAriaAttrs(),
    style: virtualizer.getContainerStyle(),
  })
  virtualizer.subscribe(render)
  virtualizer.attach(scroller)
  render()
}
