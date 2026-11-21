import type * as toc from '@zag-js/toc'

import { definePart, wrapped } from '../../utils/define.js'
import { contentTag, itemTag, itemValueOf, root } from './shared.js'

const itemOf = (api: toc.Api, el: Element) => {
  const value = itemValueOf(el)
  return api.items.find((item) => item.value === value)
}

const itemStateOf = (api: toc.Api, el: HTMLElement) => {
  const item = itemOf(api, el)
  return item ? api.getItemState({ item }) : undefined
}

export const TocContent = definePart<toc.Api>({
  tag: contentTag,
  root,
  props: () => ({}),
})

export const TocNav = definePart<toc.Api>({
  tag: 'ark-toc-nav',
  root,
  props: (api) => api.getNavProps(),
})

export const TocTitle = definePart<toc.Api>({
  tag: 'ark-toc-title',
  root,
  props: (api) => api.getTitleProps(),
})

export const TocList = definePart<toc.Api>({
  tag: 'ark-toc-list',
  root,
  props: (api) => api.getListProps(),
})

export const TocItem = definePart<toc.Api, toc.ItemState | undefined>({
  tag: itemTag,
  root,
  attributes: ['value', 'depth'],
  props: (api, el) => {
    const item = itemOf(api, el)
    return item ? api.getItemProps({ item }) : {}
  },
  state: (api, el) => itemStateOf(api, el),
})

export const TocLink = definePart<toc.Api, toc.ItemState | undefined>({
  tag: 'ark-toc-link',
  root,
  target: wrapped('a'),
  props: (api, el) => {
    const item = itemOf(api, el)
    return item ? api.getLinkProps({ item }) : {}
  },
  state: (api, el) => itemStateOf(api, el),
})

export const TocIndicator = definePart<toc.Api, toc.IndicatorState>({
  tag: 'ark-toc-indicator',
  root,
  props: (api) => api.getIndicatorProps(),
  state: (api) => api.getIndicatorState(),
})
