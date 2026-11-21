import * as marquee from '@zag-js/marquee'

import { num, str } from '../../utils/attrs.js'
import { defineRoot } from '../../utils/define.js'
import { root } from './shared.js'

const dirOf = (el: Element) =>
  (el.parentElement?.closest('[dir]')?.getAttribute('dir') ?? undefined) as 'ltr' | 'rtl' | undefined

const bool = (el: Element, name: string) => (el.hasAttribute(name) ? el.getAttribute(name) !== 'false' : undefined)

defineRoot<marquee.Api>({
  tag: root,
  machine: marquee.machine,
  connect: marquee.connect,

  attributes: [
    'side',
    'speed',
    'delay',
    'loop-count',
    'spacing',
    'auto-fill',
    'pause-on-interaction',
    'reverse',
    'paused',
    'default-paused',
  ],
  properties: ['ids', 'translations'],
  state: {
    paused: {
      get: (api) => api.paused,
      set: (api, value) => (value ? api.pause() : api.resume()),
    },
  },
  props: (el) => ({
    side: str<marquee.Side>(el, 'side'),
    speed: num(el, 'speed'),
    delay: num(el, 'delay'),
    loopCount: num(el, 'loop-count'),
    spacing: str(el, 'spacing'),
    autoFill: el.hasAttribute('auto-fill'),
    pauseOnInteraction: el.hasAttribute('pause-on-interaction'),
    reverse: el.hasAttribute('reverse'),
    paused: bool(el, 'paused'),
    defaultPaused: el.hasAttribute('default-paused'),
    dir: dirOf(el),
  }),

  actions: {
    restart: (api) => api.restart(),
  },

  events: {
    onPauseChange: 'pausechange',
    onLoopComplete: 'loopcomplete',
    onComplete: 'complete',
  },

  rootProps: (api) => api.getRootProps(),
})
