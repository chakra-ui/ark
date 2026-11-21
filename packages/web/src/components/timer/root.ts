import * as timer from '@zag-js/timer'

import { num } from '../../utils/attrs.js'
import { defineRoot } from '../../utils/define.js'
import type { TimerElement } from './index.js'
import { root } from './shared.js'

defineRoot<timer.Api>({
  tag: root,
  machine: timer.machine,
  connect: timer.connect,

  attributes: ['countdown', 'start-ms', 'target-ms', 'auto-start', 'interval'],
  properties: ['ids', 'translations'],

  actions: {
    start: (api) => api.start(),
    pause: (api) => api.pause(),
    resume: (api) => api.resume(),
    reset: (api) => api.reset(),
    restart: (api) => api.restart(),
  },

  props: (el) => {
    const { ids, translations } = el as TimerElement
    return {
      countdown: el.hasAttribute('countdown'),
      startMs: num(el, 'start-ms'),
      targetMs: num(el, 'target-ms'),
      autoStart: el.hasAttribute('auto-start'),
      interval: num(el, 'interval'),
      ids,
      translations,
    }
  },

  events: {
    onTick: 'tick',
    onComplete: 'complete',
  },

  rootProps: (api) => api.getRootProps(),
})
