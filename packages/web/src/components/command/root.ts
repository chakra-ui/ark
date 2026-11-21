import * as combobox from '@zag-js/combobox'
import { str } from '../../utils/attrs.js'
import { defineRoot, type RootElement } from '../../utils/define.js'
import { emit } from '../../utils/events.js'
import { collection, filteredOf, pageOf, queries, queryOf, root, treeOf } from './shared.js'

type CommandHost = RootElement<combobox.Api> & HTMLElement & { page?: string | null }

const shownPages = new WeakMap<HTMLElement, string | null>()

const pathOf = (el: HTMLElement, page: string | null) => {
  const path: string[] = []
  const { parentOf } = treeOf(el)
  for (let value = page; value != null && !path.includes(value); value = parentOf(value)) path.unshift(value)
  return path
}

function pageChanged(el: CommandHost) {
  const previous = shownPages.get(el) ?? null
  const page = pageOf(el)
  if (page === previous) return
  shownPages.set(el, page)
  const path = pathOf(el, previous)
  const depth = page == null ? 0 : path.indexOf(page) + 1
  const from = page == null || depth > 0 ? path[depth] : undefined
  el.api?.setInputValue('')
  emit(el, 'pagechange', { page, item: page != null ? (collection.get(el)?.find(page) ?? null) : null })
  if (from == null) return
  requestAnimationFrame(() => {
    if (el.api?.collection.has(from)) el.api.setHighlightedValue(from)
  })
}

defineRoot<combobox.Api>({
  properties: ['filter', 'page', 'navigate', 'scrollToIndexFn', 'ids', 'translations', 'items'],
  propertyChanged: (el, name) => {
    if (name === 'items') collection.update(el)
    if (name === 'page') queueMicrotask(() => pageChanged(el as CommandHost))
  },

  tag: root,
  machine: combobox.machine,
  connect: combobox.connect,
  attributes: ['input-value', 'default-input-value', 'disabled', 'loading', 'loop-focus', 'placeholder'],
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
        if (treeOf(el).owners.has(details.itemValue)) (el as CommandHost).page = details.itemValue
        else emit(el, 'itemselect', details)
      },
    }
  },
  events: { onInputValueChange: 'inputvaluechange', onHighlightChange: 'highlightchange' },
  rootProps: (api) => api.getRootProps(),
  started: (el) => {
    const first = el.api?.collection.firstValue
    if (first != null && el.api?.highlightedValue == null) el.api?.setHighlightedValue(first)
  },
  setup: (el) => {
    const host = el as CommandHost
    shownPages.set(el, pageOf(el))
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
      const page = pageOf(el)
      if (page == null) return
      event.preventDefault()
      host.page = treeOf(el).parentOf(page)
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
