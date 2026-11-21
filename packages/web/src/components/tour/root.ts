import * as tour from '@zag-js/tour'

import { num, str } from '../../utils/attrs.js'
import { definePresenceRoot } from '../../utils/presence.js'
import { flag, root } from './shared.js'

definePresenceRoot<tour.Api>({
  tag: root,
  machine: tour.machine,
  connect: tour.connect,
  present: (api) => api.open,

  attributes: [
    'step-id',
    'close-on-interact-outside',
    'close-on-escape',
    'keyboard-navigation',
    'prevent-interaction',
    'spotlight-radius',
  ],
  properties: ['ids', 'translations', 'steps', 'spotlightOffset', 'scrollToTargetFn'],
  state: {
    stepId: {
      get: (api) => api.step?.id ?? null,
      set: (api, value) => (value ? api.setStep(String(value)) : undefined),
    },
  },
  props: (el) => ({
    stepId: str(el, 'step-id'),
    closeOnInteractOutside: flag(el, 'close-on-interact-outside'),
    closeOnEscape: flag(el, 'close-on-escape'),
    keyboardNavigation: flag(el, 'keyboard-navigation'),
    preventInteraction: flag(el, 'prevent-interaction'),
    spotlightRadius: num(el, 'spotlight-radius'),
  }),

  actions: {
    start: (api, id?: string) => api.start(id),
    next: (api) => api.next(),
    previous: (api) => api.previous(),
  },

  events: {
    onStepChange: 'stepchange',
    onStepsChange: 'stepschange',
    onStatusChange: 'statuschange',
  },
})
