import {
  createListVirtualizer,
  renderVirtualItems,
  spreadVirtualizerProps,
  type VirtualItem,
} from '../../src/components/virtualizer/index.js'

import styles from 'styles/virtualizer.module.css'

const items = Array.from({ length: 10000 }, (_, index) => `Item ${index + 1}`)

const itemKey = (item: VirtualItem) => item.key

const itemClass = (index: number) => (index % 2 ? `${styles.Item} ${styles.ItemAlt}` : styles.Item)

const scrollTargets = ['top', 'middle', 'bottom']

const scrollButton = (target: string) => /* html */ `
  <button type="button" class="${styles.Trigger}" data-scroll="${target}">Scroll to ${target}</button>`

export function mount(root: HTMLElement) {
  root.innerHTML = /* html */ `
  <div>
    <div class="${styles.Controls}">
      ${scrollTargets.map(scrollButton).join('')}
    </div>
    <div class="${styles.Root}" data-testid="list">
      <div></div>
    </div>
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

  const scrollActions: Record<string, VoidFunction> = {
    top: () => virtualizer.scrollToIndex(0),
    middle: () => virtualizer.scrollToIndex(Math.floor(items.length / 2), { align: 'center' }),
    bottom: () => virtualizer.scrollToIndex(items.length - 1),
  }

  for (const button of root.querySelectorAll<HTMLButtonElement>('[data-scroll]')) {
    button.addEventListener('click', () => scrollActions[button.dataset.scroll!]())
  }

  spreadVirtualizerProps(scroller, {
    ...virtualizer.getContainerAriaAttrs(),
    style: virtualizer.getContainerStyle(),
  })
  virtualizer.subscribe(render)
  virtualizer.attach(scroller)
  render()
}
