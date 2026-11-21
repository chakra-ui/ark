import * as tabs from '@zag-js/tabs'
import { str } from '../../utils/attrs.js'
import { defineRoot } from '../../utils/define.js'
import { root } from './shared.js'

defineRoot<tabs.Api>({
  properties: ['navigate', 'ids', 'translations'],

  tag: root,
  machine: tabs.machine,
  connect: tabs.connect,
  attributes: [
    'value',
    'default-value',
    'orientation',
    'activation-mode',
    'loop-focus',
    'deselectable',
    'unmount-on-exit',
  ],
  props: (el) => ({
    value: el.hasAttribute('value') ? str(el, 'value') : undefined,
    defaultValue: str(el, 'default-value'),
    orientation: str<tabs.Props['orientation'] & string>(el, 'orientation') ?? 'horizontal',
    activationMode: str<tabs.Props['activationMode'] & string>(el, 'activation-mode') ?? 'automatic',
    loopFocus: el.getAttribute('loop-focus') !== 'false',
    deselectable: el.hasAttribute('deselectable'),
  }),
  events: { onValueChange: 'valuechange', onFocusChange: 'focuschange' },
  rootProps: (api) => api.getRootProps(),
})
