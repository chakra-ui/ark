import type { CollectionItem } from '@zag-js/collection'
import * as combobox from '@zag-js/combobox'

import { str } from '../../utils/attrs.js'
import { defineRoot, type RootElement } from '../../utils/define.js'
import { emit } from '../../utils/events.js'
import { collection, filteredOf, type Pages, pagesOf, queries, queryOf, root, setPages } from './shared.js'

type CommandHost = RootElement<combobox.Api> & HTMLElement

function navigate(el: CommandHost, next: Pages | undefined, query: string) {
  if (!next || next === pagesOf(el)) return false
  setPages(el, next)
  el.refresh()
  el.render()
  el.api?.setInputValue(query)
  emit(el, 'pagechange', { page: next.page, item: next.pageItem })
  const value = next.restore.highlightedValue
  if (value != null) {
    requestAnimationFrame(() => {
      if (el.api?.collection.has(value)) el.api.setHighlightedValue(value)
    })
  }
  return true
}

const currentQuery = (el: HTMLElement) => queryOf(el).trim()

const setPage = (el: CommandHost, value: string | null) => {
  navigate(el, pagesOf(el)?.setPage(value, currentQuery(el)), '')
}

const back = (el: CommandHost) => {
  const pages = pagesOf(el)
  if (!pages?.canGoBack) return false
  const next = pages.back(currentQuery(el))
  return navigate(el, next, next.restore.query)
}

const up = (el: CommandHost) => {
  const pages = pagesOf(el)
  return pages?.page != null ? navigate(el, pages.up(currentQuery(el)), '') : false
}

const Command = defineRoot<combobox.Api>({
  tag: root,
  machine: combobox.machine,
  connect: combobox.connect,

  attributes: ['input-value', 'default-input-value', 'disabled', 'loading', 'loop-focus', 'placeholder'],
  properties: ['navigate', 'scrollToIndexFn', 'ids', 'translations'],
  ownProperties: ['collection', 'filter'],
  propertyChanged: (el, name) => {
    if (name === 'collection') collection.update(el)
  },
  props: (el) => {
    const items = filteredOf(el)
    return {
      collection: items,
      inline: true,
      value: [],
      allowCustomValue: true,
      inputBehavior: 'autohighlight',
      selectionBehavior: 'preserve',
      inputValue: str(el, 'input-value'),
      defaultInputValue: queryOf(el),
      defaultHighlightedValue: items?.firstValue ?? undefined,
      disabled: el.hasAttribute('disabled'),
      loading: el.hasAttribute('loading'),
      loopFocus: el.hasAttribute('loop-focus'),
      placeholder: str(el, 'placeholder'),
      onSelect(details: combobox.SelectionDetails) {
        const pages = pagesOf(el)
        const item = pages?.getItem(details.itemValue)
        if (item && pages?.isPage(item)) setPage(el as CommandHost, details.itemValue)
        else emit(el, 'itemselect', details)
      },
    }
  },

  events: {
    onInputValueChange: 'inputvaluechange',
    onHighlightChange: 'highlightchange',
  },

  rootProps: (api) => api.getRootProps(),
  started: (el) => {
    const first = el.api?.collection.firstValue
    if (first != null && el.api?.highlightedValue == null) el.api?.setHighlightedValue(first)
  },
  setup: (el) => {
    const cleanup = collection.setup(el)
    const onInput = (event: Event) => {
      const { inputValue } = (event as CustomEvent<combobox.InputValueChangeDetails>).detail
      if (inputValue === (queries.get(el) ?? '')) return
      queries.set(el, inputValue)
      el.refresh()
    }
    const onKeyDown = (event: KeyboardEvent) => {
      const input = event.target as HTMLInputElement
      if (event.key !== 'Backspace' || !input.matches?.('ark-command-input > input') || input.value) return
      if (up(el as CommandHost)) event.preventDefault()
    }
    el.addEventListener('inputvaluechange', onInput)
    el.addEventListener('keydown', onKeyDown)
    return () => {
      cleanup()
      el.removeEventListener('inputvaluechange', onInput)
      el.removeEventListener('keydown', onKeyDown)
    }
  },
})

Object.defineProperties(Command.prototype, {
  page: {
    configurable: true,
    get(this: CommandHost) {
      return pagesOf(this)?.page ?? null
    },
  },
  path: {
    configurable: true,
    get(this: CommandHost) {
      return pagesOf(this)?.getPath() ?? []
    },
  },
  canGoBack: {
    configurable: true,
    get(this: CommandHost) {
      return pagesOf(this)?.canGoBack ?? false
    },
  },
  setPage: {
    configurable: true,
    value(this: CommandHost, value: string | null) {
      setPage(this, value)
    },
  },
  back: {
    configurable: true,
    value(this: CommandHost) {
      return back(this)
    },
  },
  up: {
    configurable: true,
    value(this: CommandHost) {
      return up(this)
    },
  },
  isPage: {
    configurable: true,
    value(this: CommandHost, item: CollectionItem) {
      return pagesOf(this)?.isPage(item) ?? false
    },
  },
  getAncestors: {
    configurable: true,
    value(this: CommandHost, item: CollectionItem) {
      return pagesOf(this)?.getAncestors(item) ?? []
    },
  },
})
