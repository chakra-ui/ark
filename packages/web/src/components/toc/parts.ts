import type * as toc from '@zag-js/toc'

import { definePart, wrapped } from '../../utils/define.js'
import { contentTag, itemTag, itemValueOf, root } from './shared.js'

const itemOf = (api: toc.Api, el: Element) => {
  const value = itemValueOf(el)
  return api.items.find((item) => item.value === value)
}

definePart<toc.Api>({
  tag: contentTag,
  root,
  props: () => ({}),
})

definePart<toc.Api>({
  tag: 'ark-toc-nav',
  root,
  props: (api) => api.getNavProps(),
})

definePart<toc.Api>({
  tag: 'ark-toc-title',
  root,
  props: (api) => api.getTitleProps(),
})

definePart<toc.Api>({
  tag: 'ark-toc-list',
  root,
  props: (api) => api.getListProps(),
})

definePart<toc.Api>({
  tag: itemTag,
  root,
  props: (api, el) => {
    const item = itemOf(api, el)
    return item ? api.getItemProps({ item }) : {}
  },
})

definePart<toc.Api>({
  tag: 'ark-toc-link',
  root,
  target: wrapped('a'),
  props: (api, el) => {
    const item = itemOf(api, el)
    return item ? api.getLinkProps({ item }) : {}
  },
})

definePart<toc.Api>({
  tag: 'ark-toc-indicator',
  root,
  props: (api) => api.getIndicatorProps(),
})
