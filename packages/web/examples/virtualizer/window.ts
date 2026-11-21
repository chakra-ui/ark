import {
  createWindowVirtualizer,
  renderVirtualItems,
  spreadVirtualizerProps,
  type VirtualItem,
} from '../../src/components/virtualizer/index.js'

import styles from 'styles/virtualizer.module.css'

const items = Array.from({ length: 10000 }, (_, index) => `Item ${index + 1}`)

const itemKey = (item: VirtualItem) => item.key

const itemClass = (index: number) => (index % 2 ? `${styles.Item} ${styles.ItemAlt}` : styles.Item)

export function mount(root: HTMLElement) {
  root.innerHTML = /* html */ `
  <div class="${styles.Window}" data-testid="window">
    <div></div>
  </div>`

  const container = root.querySelector<HTMLElement>('[data-testid="window"]')!
  const content = container.querySelector('div')!

  const virtualizer = createWindowVirtualizer({
    count: items.length,
    estimatedSize: () => 48,
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

  spreadVirtualizerProps(container, {
    ...virtualizer.getContainerAriaAttrs(),
    style: virtualizer.getContainerStyle(),
  })
  virtualizer.subscribe(render)
  requestAnimationFrame(() => {
    virtualizer.attach(container)
    render()
  })
}
