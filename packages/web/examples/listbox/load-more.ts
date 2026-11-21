import { createElement, Check } from 'lucide'

import { createListCollection } from '@ark-ui/web/listbox'
import { createAsyncList } from '@ark-ui/web/async-list'

import styles from 'styles/listbox.module.css'

interface Pokemon {
  id: number
  name: string
}

const PAGE_SIZE = 20
const TOTAL = 200

async function fetchPage(offset: number, signal: AbortSignal | undefined) {
  await new Promise((resolve) => setTimeout(resolve, 300))
  if (signal?.aborted) return []
  const count = Math.min(PAGE_SIZE, TOTAL - offset)
  return Array.from({ length: count }, (_, index) => ({
    id: offset + index + 1,
    name: `Pokémon #${offset + index + 1}`,
  }))
}

export function mount(root: HTMLElement) {
  root.innerHTML = /* html */ `
  <ark-listbox class="${styles.Root}">
    <ark-listbox-label class="${styles.Label}">Pokémon</ark-listbox-label>
    <ark-listbox-content class="${styles.Content}" style="overflow-y: auto">
      <ark-listbox-list class="${styles.List}" style="flex: none; overflow: visible">
        <template>
          <ark-listbox-item class="${styles.Item}">
            <ark-listbox-item-text class="${styles.ItemText}"></ark-listbox-item-text>
            <ark-listbox-item-indicator class="${styles.ItemIndicator}">${createElement(Check, { 'aria-hidden': 'true' }).outerHTML}</ark-listbox-item-indicator>
          </ark-listbox-item>
        </template>
      </ark-listbox-list>
      <div class="${styles.Status}" role="status" data-sentinel>Loading...</div>
    </ark-listbox-content>
  </ark-listbox>`

  const listbox = root.querySelector('ark-listbox')!
  const content = root.querySelector<HTMLElement>('ark-listbox-content')!
  const sentinel = root.querySelector<HTMLElement>('[data-sentinel]')!

  const list = createAsyncList<Pokemon>({
    async load({ cursor, signal }) {
      const offset = Number(cursor ?? 0)
      const items = await fetchPage(offset, signal)
      const next = offset + items.length
      return { items, cursor: next < TOTAL ? String(next) : undefined }
    },
  })

  const update = () => {
    listbox.collection = createListCollection({
      items: list.items,
      itemToValue: (pokemon) => String(pokemon.id),
      itemToString: (pokemon) => pokemon.name,
    })
    sentinel.hidden = !list.isLoading && !list.hasMore
    sentinel.textContent = list.isLoading ? 'Loading...' : ''
  }

  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting && list.hasMore && !list.isLoading) list.loadMore()
    },
    { root: content, rootMargin: '0px 0px 80px 0px' },
  )

  list.subscribe(update)
  list.reload()
  update()
  queueMicrotask(() => observer.observe(sentinel))
}
