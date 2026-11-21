import * as numberFlow from '@zag-js/number-flow'

import { num, str } from '../../utils/attrs.js'
import { defineRoot } from '../../utils/define.js'
import { root } from './shared.js'

const trendOf = (el: Element): numberFlow.Trend | undefined => {
  const value = el.getAttribute('trend')
  if (value == null) return undefined
  if (value === '1' || value === '-1') return Number(value) as 1 | -1
  return value !== 'false'
}

defineRoot<numberFlow.Api>({
  tag: root,
  machine: numberFlow.machine,
  connect: numberFlow.connect,

  attributes: [
    'value',
    'default-value',
    'locale',
    'prefix',
    'suffix',
    'trend',
    'continuous',
    'stagger',
    'live',
    'respect-motion-preference',
  ],
  properties: ['ids', 'formatOptions', 'spinTiming', 'transformTiming'],
  state: {
    value: {
      get: (api) => api.value,
      set: (api, value) => api.setValue(Number(value)),
    },
  },
  props: (el) => ({
    value: num(el, 'value'),
    defaultValue: num(el, 'default-value'),
    locale: str(el, 'locale'),
    prefix: str(el, 'prefix'),
    suffix: str(el, 'suffix'),
    trend: trendOf(el),
    continuous: el.hasAttribute('continuous'),
    stagger: str(el, 'stagger'),
    live: el.hasAttribute('live') ? el.getAttribute('live') !== 'false' : undefined,
    respectMotionPreference: el.hasAttribute('respect-motion-preference')
      ? el.getAttribute('respect-motion-preference') !== 'false'
      : undefined,
  }),

  events: {
    onValueChange: 'valuechange',
    onAnimationStart: 'animationstart',
    onAnimationComplete: 'animationcomplete',
  },

  rootProps: (api) => api.getRootProps(),
})
