import { createAsyncList } from '@ark-ui/web/async-list'

import '@ark-ui/web/virtualizer'

import styles from 'styles/virtualizer.module.css'

const PAGE_SIZE = 50
const TOTAL = 500

const loadPage = async ({ cursor }: { cursor?: string }) => {
  const start = Number(cursor ?? 0)
  await new Promise((resolve) => setTimeout(resolve, 600))
  const items = Array.from({ length: Math.min(PAGE_SIZE, TOTAL - start) }, (_, index) => `Item ${start + index + 1}`)
  const next = start + items.length
  return { items, cursor: next < TOTAL ? String(next) : undefined }
}

export function mount(root: HTMLElement) {
  root.innerHTML = /* html */ `
    <div class="stack">
      <ark-list-virtualizer class="${styles.Root}" count="0" estimated-size="48">
        <ark-list-virtualizer-content>
          <template><ark-list-virtualizer-item class="${styles.Item}"></ark-list-virtualizer-item></template>
        </ark-list-virtualizer-content>
      </ark-list-virtualizer>
      <output class="${styles.Meta}"></output>
    </div>`

  const view = root.querySelector('ark-list-virtualizer')!
  const status = root.querySelector('output')!
  const list = createAsyncList<string>({ autoReload: true, load: loadPage })

  view.renderItem = (element, item) => {
    element.textContent = list.items[item.index]
    element.classList.toggle(styles.ItemAlt, item.index % 2 === 1)
  }
  view.options = {
    onRangeChange: ({ range }) => {
      if (range.endIndex >= list.items.length - 10 && list.cursor !== undefined && !list.isLoading) list.loadMore()
    },
  }

  const sync = () => {
    if (view.count !== list.items.length) view.count = list.items.length
    status.textContent = list.isLoading ? 'Loading more…' : `${list.items.length} of ${TOTAL} loaded`
  }
  list.subscribe(sync)
  sync()
}
