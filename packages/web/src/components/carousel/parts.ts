import type * as carousel from '@zag-js/carousel'
import { definePart, wrappedButton } from '../../utils/define.js'
import { repeat, templateOf } from '../../utils/repeat.js'
import { indexOf, indicatorTag, itemTag, root } from './shared.js'

const autoText = new WeakSet<HTMLElement>()

const itemPropsOf = (el: HTMLElement): carousel.ItemProps => ({
  index: indexOf(el, itemTag),
  snapAlign: (el.getAttribute('snap-align') ?? undefined) as carousel.ItemProps['snapAlign'],
})

const indicatorPropsOf = (el: HTMLElement): carousel.IndicatorProps => ({
  index: indexOf(el, indicatorTag),
  readOnly: el.hasAttribute('readonly'),
})

export const CarouselControl = definePart<carousel.Api>({
  tag: 'ark-carousel-control',
  root,
  props: (api) => api.getControlProps(),
})

export const CarouselItemGroup = definePart<carousel.Api>({
  tag: 'ark-carousel-item-group',
  root,
  props: (api) => api.getItemGroupProps(),
})

export const CarouselItem = definePart<carousel.Api, carousel.ItemState>({
  tag: itemTag,
  root,
  attributes: ['index', 'snap-align'],
  props: (api, el) => api.getItemProps(itemPropsOf(el)),
  state: (api, el) => api.getItemState(itemPropsOf(el)),
})

export const CarouselPrevTrigger = definePart<carousel.Api>({
  tag: 'ark-carousel-prev-trigger',
  root,
  target: wrappedButton,
  props: (api) => api.getPreviousTriggerProps(),
})

export const CarouselNextTrigger = definePart<carousel.Api>({
  tag: 'ark-carousel-next-trigger',
  root,
  target: wrappedButton,
  props: (api) => api.getNextTriggerProps(),
})

export const CarouselAutoplayTrigger = definePart<carousel.Api>({
  tag: 'ark-carousel-autoplay-trigger',
  root,
  target: wrappedButton,
  props: (api) => api.getAutoplayTriggerProps(),
})

// Children marked `fallback` show while paused, the rest while playing
export const CarouselAutoplayIndicator = definePart<carousel.Api>({
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
export const CarouselIndicatorGroup = definePart<carousel.Api>({
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

export const CarouselIndicator = definePart<carousel.Api, carousel.IndicatorState>({
  tag: indicatorTag,
  root,
  attributes: ['index', 'readonly'],
  target: wrappedButton,
  props: (api, el) => api.getIndicatorProps(indicatorPropsOf(el)),
  state: (api, el) => api.getIndicatorState(indicatorPropsOf(el)),
})

export const CarouselProgressText = definePart<carousel.Api>({
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
