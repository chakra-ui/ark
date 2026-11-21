import type * as marquee from '@zag-js/marquee'

import { definePart } from '../../utils/define.js'
import { contentIndexOf, contentTag, root, syncCopies } from './shared.js'

const counts = new WeakMap<HTMLElement, number>()

export const MarqueeViewport = definePart<marquee.Api>({
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

export const MarqueeContent = definePart<marquee.Api, marquee.ContentState>({
  tag: contentTag,
  root,
  props: (api, el) => api.getContentProps({ index: contentIndexOf(el) }),
  state: (api, el) => api.getContentState({ index: contentIndexOf(el) }),
})

export const MarqueeItem = definePart<marquee.Api>({
  tag: 'ark-marquee-item',
  root,
  props: (api) => api.getItemProps(),
})

export const MarqueeEdge = definePart<marquee.Api>({
  tag: 'ark-marquee-edge',
  root,
  attributes: ['side'],
  props: (api, el) => api.getEdgeProps({ side: (el.getAttribute('side') ?? 'start') as marquee.Side }),
})
