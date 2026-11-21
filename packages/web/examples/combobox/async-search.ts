import { createElement, X, ChevronsUpDown, Check, LoaderCircle } from 'lucide'

import { createListCollection } from '../../src/components/combobox/index.js'
import { createAsyncList } from '../../src/utils/async-list.js'
import { createFilter } from '../../src/utils/locale.js'

import styles from 'styles/combobox.module.css'

const { contains } = createFilter({ sensitivity: 'base' })

interface Movie {
  id: string
  title: string
  year: number
  director: string
}

const movies: Movie[] = [
  { id: 'inception', title: 'Inception', year: 2010, director: 'Christopher Nolan' },
  { id: 'the-dark-knight', title: 'The Dark Knight', year: 2008, director: 'Christopher Nolan' },
  { id: 'pulp-fiction', title: 'Pulp Fiction', year: 1994, director: 'Quentin Tarantino' },
  { id: 'the-godfather', title: 'The Godfather', year: 1972, director: 'Francis Ford Coppola' },
  { id: 'the-matrix', title: 'The Matrix', year: 1999, director: 'The Wachowskis' },
  { id: 'interstellar', title: 'Interstellar', year: 2014, director: 'Christopher Nolan' },
  { id: 'parasite', title: 'Parasite', year: 2019, director: 'Bong Joon-ho' },
  { id: 'goodfellas', title: 'Goodfellas', year: 1990, director: 'Martin Scorsese' },
]

function statusOf(isLoading: boolean, error: Error | undefined, count: number, filter: string) {
  if (isLoading) return 'Searching...'
  if (error) return error.message
  if (count > 0) return ''
  return filter ? 'No results found' : 'Start typing to search movies...'
}

export function mount(root: HTMLElement) {
  root.innerHTML = /* html */ `
  <ark-combobox class="${styles.Root}" filter="none">
    <ark-combobox-label class="${styles.Label}">Movie</ark-combobox-label>
    <ark-combobox-control class="${styles.Control}">
      <ark-combobox-input><input class="${styles.Input}" placeholder="e.g. Inception" /></ark-combobox-input>
      <div class="${styles.Indicators}">
        <ark-combobox-clear-trigger><button class="${styles.ClearTrigger}">${createElement(X, { 'aria-hidden': 'true' }).outerHTML}</button></ark-combobox-clear-trigger>
        <ark-combobox-trigger><button class="${styles.Trigger}">${createElement(ChevronsUpDown, { 'aria-hidden': 'true' }).outerHTML}</button></ark-combobox-trigger>
      </div>
    </ark-combobox-control>
    <ark-combobox-positioner class="${styles.Positioner}">
      <ark-combobox-content class="${styles.Content}">
        <div class="${styles.Status}" role="status">
          <span data-spinner hidden>${createElement(LoaderCircle, { class: styles.Spinner, 'aria-hidden': 'true' }).outerHTML}</span>
          <span data-message></span>
        </div>
        <ark-combobox-list class="${styles.List}">
          <template>
            <ark-combobox-item class="${styles.Item}">
              <ark-combobox-item-text class="${styles.ItemText}"></ark-combobox-item-text>
              <ark-combobox-item-indicator class="${styles.ItemIndicator}">${createElement(Check, { 'aria-hidden': 'true' }).outerHTML}</ark-combobox-item-indicator>
            </ark-combobox-item>
          </template>
        </ark-combobox-list>
      </ark-combobox-content>
    </ark-combobox-positioner>
  </ark-combobox>`

  const combobox = root.querySelector('ark-combobox')!
  const status = root.querySelector<HTMLElement>('[role="status"]')!
  const spinner = status.querySelector<HTMLElement>('[data-spinner]')!
  const message = status.querySelector<HTMLElement>('[data-message]')!

  const list = createAsyncList<Movie>({
    async load({ filter, signal }) {
      if (!filter) return { items: [] }
      await new Promise((resolve) => setTimeout(resolve, 400))
      if (signal?.aborted) return { items: [] }
      return {
        items: movies.filter((movie) => contains(movie.title, filter) || contains(movie.director, filter)),
      }
    },
  })

  const update = () => {
    combobox.collection = createListCollection({
      items: list.items,
      itemToValue: (movie) => movie.id,
      itemToString: (movie) => movie.title,
    })
    combobox.toggleAttribute('loading', list.isLoading)
    const text = statusOf(list.isLoading, list.error, list.items.length, list.filter)
    spinner.hidden = !list.isLoading
    message.textContent = text
    status.hidden = !text
  }

  combobox.addEventListener('inputvaluechange', (event) => {
    if (event.detail.reason === 'input-change') list.setFilter(event.detail.inputValue)
  })
  list.subscribe(update)
  update()
}
