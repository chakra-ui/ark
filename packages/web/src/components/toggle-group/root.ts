import * as toggleGroup from '@zag-js/toggle-group'
import { list, str } from '../../utils/attrs.js'
import { defineRoot } from '../../utils/define.js'
import { root } from './shared.js'

defineRoot<toggleGroup.Api>({
  properties: ['ids'],

  tag: root,
  machine: toggleGroup.machine,
  connect: toggleGroup.connect,
  attributes: [
    'value',
    'default-value',
    'multiple',
    'disabled',
    'orientation',
    'loop-focus',
    'roving-focus',
    'deselectable',
  ],
  state: {
    value: {
      get: (api) => api.value,
      set: (api, value) => api.setValue(value),
    },
  },
  props: (el) => ({
    value: el.hasAttribute('value') ? (list(el, 'value') ?? []) : undefined,
    defaultValue: list(el, 'default-value'),
    multiple: el.hasAttribute('multiple'),
    disabled: el.hasAttribute('disabled'),
    orientation: str<toggleGroup.Props['orientation'] & string>(el, 'orientation'),
    loopFocus: el.getAttribute('loop-focus') !== 'false',
    rovingFocus: el.getAttribute('roving-focus') !== 'false',
    deselectable: el.getAttribute('deselectable') !== 'false',
  }),
  events: { onValueChange: 'valuechange' },
  rootProps: (api) => api.getRootProps(),
})
