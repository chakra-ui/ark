import { createElement, Search } from 'lucide'

import { createListCollection } from '../../src/components/command/index.js'
import { createAsyncList } from '../../src/utils/async-list.js'

import styles from 'styles/command.module.css'

interface Person {
  id: string
  name: string
}

const people: Person[] = [
  { id: 'ada', name: 'Ada Lovelace' },
  { id: 'alan', name: 'Alan Turing' },
  { id: 'grace', name: 'Grace Hopper' },
  { id: 'katherine', name: 'Katherine Johnson' },
  { id: 'linus', name: 'Linus Torvalds' },
  { id: 'margaret', name: 'Margaret Hamilton' },
]

export function mount(root: HTMLElement) {
  root.innerHTML = /* html */ `
  <ark-command class="${styles.Root}">
    <ark-command-label class="${styles.Label}">People</ark-command-label>
    <ark-command-control class="${styles.Control}">
      ${createElement(Search, { 'aria-hidden': 'true' }).outerHTML}
      <ark-command-input><input class="${styles.Input}" placeholder="Search people..." aria-label="Search people" /></ark-command-input>
    </ark-command-control>
    <ark-command-list class="${styles.List}">
      <template>
        <ark-command-item class="${styles.Item}">
          <ark-command-item-text class="${styles.ItemText}"></ark-command-item-text>
        </ark-command-item>
      </template>
    </ark-command-list>
    <div class="${styles.Loading}" hidden>Loading...</div>
    <div class="${styles.Empty}" role="alert" hidden></div>
    <ark-command-empty class="${styles.Empty}">No people found</ark-command-empty>
  </ark-command>`

  const command = root.querySelector('ark-command')!
  const loading = root.querySelector<HTMLElement>(`.${styles.Loading}`)!
  const error = root.querySelector<HTMLElement>('[role=alert]')!
  const empty = root.querySelector<HTMLElement>('ark-command-empty')!

  const list = createAsyncList<Person>({
    autoReload: true,
    async load({ filter, signal }) {
      await new Promise((resolve) => setTimeout(resolve, 300))
      if (signal?.aborted) return { items: [] }
      const query = (filter ?? '').toLowerCase()
      return { items: people.filter((person) => person.name.toLowerCase().includes(query)) }
    },
  })

  const update = () => {
    command.collection = createListCollection({
      items: list.items,
      itemToValue: (person) => person.id,
      itemToString: (person) => person.name,
    })
    command.toggleAttribute('loading', list.isLoading)
    loading.hidden = !list.isLoading
    error.hidden = list.isLoading || !list.error
    error.textContent = list.error?.message ?? ''
    empty.style.display = list.isLoading || list.error ? 'none' : ''
  }

  command.filter = (items) => items
  command.addEventListener('inputvaluechange', (event) => list.setFilter(event.detail.inputValue))
  list.subscribe(update)
  update()
}
