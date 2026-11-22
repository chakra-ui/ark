import { createSharedMutationObserver } from '@zag-js/dom-query'
import type * as scrollArea from '@zag-js/scroll-area'
import { definePart } from '../../utils/define.js'
import { type Api, orientationOf, root, scrollbarTag } from './shared.js'

const orientationObserver = createSharedMutationObserver({ attributeFilter: ['orientation'] })

export const ScrollAreaViewport = definePart<Api, scrollArea.ViewportState>({
  tag: 'ark-scroll-area-viewport',
  root,
  props: (api) => api.getViewportProps(),
  state: (api) => api.getViewportState(),
})

export const ScrollAreaContent = definePart<Api>({
  tag: 'ark-scroll-area-content',
  root,
  props: (api) => api.getContentProps(),
})

export const ScrollAreaScrollbar = definePart<Api, scrollArea.ScrollbarState>({
  tag: scrollbarTag,
  root,
  attributes: ['orientation'],
  props: (api, el) => api.getScrollbarProps({ orientation: orientationOf(el) }),
  state: (api, el) => api.getScrollbarState({ orientation: orientationOf(el) }),

  setup: (el, rootEl) => {
    return orientationObserver.observe(el, () => rootEl.render())
  },
})

export const ScrollAreaThumb = definePart<Api>({
  tag: 'ark-scroll-area-thumb',
  root,
  props: (api, el) => {
    const scrollbar = el.closest(scrollbarTag)
    return api.getThumbProps({ orientation: orientationOf(scrollbar) })
  },
})

export const ScrollAreaCorner = definePart<Api, scrollArea.CornerState>({
  tag: 'ark-scroll-area-corner',
  root,
  props: (api) => api.getCornerProps(),
  state: (api) => api.getCornerState(),
})
