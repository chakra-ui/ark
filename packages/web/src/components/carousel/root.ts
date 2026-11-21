import * as carousel from '@zag-js/carousel'
import { num, numbers, str } from '../../utils/attrs.js'
import { defineRoot } from '../../utils/define.js'
import { itemTag, ownParts, root } from './shared.js'

const count = (el: HTMLElement) => num(el, 'count') ?? ownParts(el, itemTag).length

function autoPlay(el: HTMLElement): carousel.Props['autoPlay'] {
  if (!el.hasAttribute('auto-play')) return false
  const delay = num(el, 'auto-play')
  return delay == null || Number.isNaN(delay) ? true : { delay }
}

function slidesPerMove(el: HTMLElement): carousel.Props['slidesPerMove'] {
  const value = str(el, 'slides-per-move')
  return value === 'auto' ? value : num(el, 'slides-per-move')
}

defineRoot<carousel.Api>({
  properties: ['ids', 'translations'],

  tag: root,
  machine: carousel.machine,
  connect: carousel.connect,
  attributes: [
    'count',
    'page',
    'default-page',
    'orientation',
    'slides-per-page',
    'slides-per-move',
    'auto-size',
    'auto-play',
    'allow-mouse-drag',
    'loop',
    'spacing',
    'item-spacing',
    'snap-type',
    'in-view-threshold',
  ],
  state: {
    page: {
      get: (api) => api.page,
      set: (api, value) => api.scrollTo(Number(value)),
    },
  },

  actions: {
    scrollNext: (api, instant?: boolean) => api.scrollNext(instant),
    scrollPrevious: (api, instant?: boolean) => api.scrollPrevious(instant),
  },

  props: (el) => {
    const threshold = numbers(el, 'in-view-threshold')
    return {
      count: count(el),
      page: num(el, 'page'),
      defaultPage: num(el, 'default-page'),
      orientation: str<'horizontal' | 'vertical'>(el, 'orientation'),
      slidesPerPage: num(el, 'slides-per-page'),
      slidesPerMove: slidesPerMove(el),
      autoSize: el.hasAttribute('auto-size'),
      autoPlay: autoPlay(el),
      allowMouseDrag: el.hasAttribute('allow-mouse-drag'),
      loop: el.hasAttribute('loop'),
      spacing: str(el, 'spacing'),
      itemSpacing: str(el, 'item-spacing'),
      snapType: str<'proximity' | 'mandatory'>(el, 'snap-type'),
      inViewThreshold: threshold?.length === 1 ? threshold[0] : threshold,
    }
  },
  events: {
    onPageChange: 'pagechange',
    onDragStatusChange: 'dragstatuschange',
    onAutoplayStatusChange: 'autoplaystatuschange',
  },
  setup: (el) => {
    let last = count(el)
    const observer = new MutationObserver(() => {
      const next = count(el)
      if (next === last) return
      last = next
      el.refresh()
    })
    observer.observe(el, { subtree: true, childList: true })
    return () => observer.disconnect()
  },
  rootProps: (api) => api.getRootProps(),
})
