import type * as pagination from '@zag-js/pagination'
import { num } from '../../utils/attrs.js'
import { definePart, wrappedButton } from '../../utils/define.js'
import { root } from './shared.js'

const autoText = new WeakSet<HTMLElement>()

const itemOf = (el: HTMLElement): pagination.ItemProps => ({ type: 'page', value: num(el, 'value') ?? 1 })

export const PaginationItem = definePart<pagination.Api, pagination.ItemState>({
  tag: 'ark-pagination-item',
  root,
  attributes: ['value'],
  target: wrappedButton,
  setup: (el) => {
    const target = wrappedButton(el)
    if (target && !target.firstChild) autoText.add(el)
  },
  props: (api, el) => api.getItemProps(itemOf(el)),
  state: (api, el) => api.getItemState(itemOf(el)),
  render: (_, el) => {
    const target = wrappedButton(el)
    if (target && autoText.has(el)) target.textContent = el.getAttribute('value') ?? ''
  },
})

export const PaginationEllipsis = definePart<pagination.Api>({
  tag: 'ark-pagination-ellipsis',
  root,
  attributes: ['index'],
  props: (api, el) => api.getEllipsisProps({ index: num(el, 'index') ?? 0 }),
})

export const PaginationFirstTrigger = definePart<pagination.Api>({
  tag: 'ark-pagination-first-trigger',
  root,
  target: wrappedButton,
  props: (api) => api.getFirstTriggerProps(),
})

export const PaginationPreviousTrigger = definePart<pagination.Api>({
  tag: 'ark-pagination-previous-trigger',
  root,
  target: wrappedButton,
  props: (api) => api.getPreviousTriggerProps(),
})

export const PaginationNextTrigger = definePart<pagination.Api>({
  tag: 'ark-pagination-next-trigger',
  root,
  target: wrappedButton,
  props: (api) => api.getNextTriggerProps(),
})

export const PaginationLastTrigger = definePart<pagination.Api>({
  tag: 'ark-pagination-last-trigger',
  root,
  target: wrappedButton,
  props: (api) => api.getLastTriggerProps(),
})
