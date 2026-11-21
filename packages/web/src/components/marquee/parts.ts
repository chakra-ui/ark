import type * as marquee from '@zag-js/marquee'

import { definePart } from '../../utils/define.js'
import { contentIndexOf, contentTag, root, syncCopies } from './shared.js'

const counts = new WeakMap<HTMLElement, number>()

definePart<marquee.Api>({
  tag: 'ark-marquee-viewport',
  root,
  props: (api) => api.getViewportProps(),
  render: (api, el) => {
    if (counts.get(el) === api.contentCount) return
    counts.set(el, api.contentCount)
    syncCopies(el, api.contentCount)
  },
  setup: (el) => {
    const source = el.querySelector(`:scope > ${contentTag}:not([data-rendered])`)
    if (!source) return
    const observer = new MutationObserver(() => syncCopies(el, counts.get(el) ?? 1, true))
    observer.observe(source, { childList: true, subtree: true, characterData: true })
    return () => observer.disconnect()
  },
})

definePart<marquee.Api>({
  tag: contentTag,
  root,
  props: (api, el) => api.getContentProps({ index: contentIndexOf(el) }),
})

definePart<marquee.Api>({
  tag: 'ark-marquee-item',
  root,
  props: (api) => api.getItemProps(),
})

definePart<marquee.Api>({
  tag: 'ark-marquee-edge',
  root,
  props: (api, el) => api.getEdgeProps({ side: (el.getAttribute('side') ?? 'start') as marquee.Side }),
})
