import { definePart } from '../../utils/define.js'
import { type Api, orientationOf, root, scrollbarTag } from './shared.js'

definePart<Api>({
  tag: 'ark-scroll-area-viewport',
  root,
  props: (api) => api.getViewportProps(),
})

definePart<Api>({
  tag: 'ark-scroll-area-content',
  root,
  props: (api) => api.getContentProps(),
})

definePart<Api>({
  tag: scrollbarTag,
  root,
  props: (api, el) => api.getScrollbarProps({ orientation: orientationOf(el) }),

  setup: (el, rootEl) => {
    const observer = new MutationObserver(() => rootEl.render())
    observer.observe(el, { attributeFilter: ['orientation'] })
    return () => observer.disconnect()
  },
})

definePart<Api>({
  tag: 'ark-scroll-area-thumb',
  root,
  props: (api, el) => {
    const scrollbar = el.closest(scrollbarTag)
    return api.getThumbProps({ orientation: orientationOf(scrollbar) })
  },
})

definePart<Api>({
  tag: 'ark-scroll-area-corner',
  root,
  props: (api) => api.getCornerProps(),
})
