import type * as pagination from '@zag-js/pagination'
import { num } from '../../utils/attrs.js'
import { definePart, wrappedButton } from '../../utils/define.js'
import { root } from './shared.js'

const autoText = new WeakSet<HTMLElement>()

definePart<pagination.Api>({
  tag: 'ark-pagination-item',
  root,
  target: wrappedButton,
  setup: (el) => {
    const target = wrappedButton(el)
    if (target && !target.firstChild) autoText.add(el)
  },
  props: (api, el) => api.getItemProps({ type: 'page', value: num(el, 'value') ?? 1 }),
  render: (_, el) => {
    const target = wrappedButton(el)
    if (target && autoText.has(el)) target.textContent = el.getAttribute('value') ?? ''
  },
})

definePart<pagination.Api>({
  tag: 'ark-pagination-ellipsis',
  root,
  props: (api, el) => api.getEllipsisProps({ index: num(el, 'index') ?? 0 }),
})

definePart<pagination.Api>({
  tag: 'ark-pagination-first-trigger',
  root,
  target: wrappedButton,
  props: (api) => api.getFirstTriggerProps(),
})

definePart<pagination.Api>({
  tag: 'ark-pagination-previous-trigger',
  root,
  target: wrappedButton,
  props: (api) => api.getPreviousTriggerProps(),
})

definePart<pagination.Api>({
  tag: 'ark-pagination-next-trigger',
  root,
  target: wrappedButton,
  props: (api) => api.getNextTriggerProps(),
})

definePart<pagination.Api>({
  tag: 'ark-pagination-last-trigger',
  root,
  target: wrappedButton,
  props: (api) => api.getLastTriggerProps(),
})
