import type * as carousel from '@zag-js/carousel'
import { definePart, wrappedButton } from '../../utils/define.js'
import { repeat, templateOf } from '../../utils/repeat.js'
import { indexOf, indicatorTag, itemTag, root } from './shared.js'

const autoText = new WeakSet<HTMLElement>()

definePart<carousel.Api>({ tag: 'ark-carousel-control', root, props: (api) => api.getControlProps() })

definePart<carousel.Api>({ tag: 'ark-carousel-item-group', root, props: (api) => api.getItemGroupProps() })

definePart<carousel.Api>({
  tag: itemTag,
  root,
  props: (api, el) =>
    api.getItemProps({
      index: indexOf(el, itemTag),
      snapAlign: (el.getAttribute('snap-align') ?? undefined) as carousel.ItemProps['snapAlign'],
    }),
})

definePart<carousel.Api>({
  tag: 'ark-carousel-prev-trigger',
  root,
  target: wrappedButton,
  props: (api) => api.getPreviousTriggerProps(),
})

definePart<carousel.Api>({
  tag: 'ark-carousel-next-trigger',
  root,
  target: wrappedButton,
  props: (api) => api.getNextTriggerProps(),
})

definePart<carousel.Api>({
  tag: 'ark-carousel-autoplay-trigger',
  root,
  target: wrappedButton,
  props: (api) => api.getAutoplayTriggerProps(),
})

// Children marked `fallback` show while paused, the rest while playing
definePart<carousel.Api>({
  tag: 'ark-carousel-autoplay-indicator',
  root,
  display: 'contents',
  props: () => ({}),
  render: (api, el) => {
    for (const child of el.children as HTMLCollectionOf<HTMLElement | SVGElement>) {
      child.style.display = child.hasAttribute('fallback') === api.isPlaying ? 'none' : ''
    }
  },
})

// A <template> child is stamped once per page snap point
definePart<carousel.Api>({
  tag: 'ark-carousel-indicator-group',
  root,
  props: (api) => api.getIndicatorGroupProps(),
  render: (api, el) => {
    const template = templateOf(el)
    if (!template) return
    repeat(
      template,
      api.pageSnapPoints,
      (_, index) => String(index),
      (node, _, index) => {
        node.setAttribute('index', String(index))
      },
    )
  },
})

definePart<carousel.Api>({
  tag: indicatorTag,
  root,
  target: wrappedButton,
  props: (api, el) =>
    api.getIndicatorProps({ index: indexOf(el, indicatorTag), readOnly: el.hasAttribute('readonly') }),
})

definePart<carousel.Api>({
  tag: 'ark-carousel-progress-text',
  root,
  setup: (el) => {
    if (!el.firstChild) autoText.add(el)
  },
  props: (api) => api.getProgressTextProps(),
  render: (api, el) => {
    if (autoText.has(el)) el.textContent = api.getProgressText()
  },
})
