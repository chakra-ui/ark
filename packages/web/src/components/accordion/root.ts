import * as accordion from '@zag-js/accordion'
import { defineRoot } from '../../utils/define.js'
import { listOf, root } from './shared.js'

defineRoot<accordion.Api>({
  properties: ['ids'],

  tag: root,
  machine: accordion.machine,
  connect: accordion.connect,
  attributes: ['multiple', 'collapsible', 'value', 'default-value', 'disabled', 'orientation'],
  props: (el) => ({
    multiple: el.hasAttribute('multiple'),
    collapsible: el.hasAttribute('collapsible'),
    value: el.hasAttribute('value') ? (listOf(el.getAttribute('value')) ?? []) : undefined,
    defaultValue: listOf(el.getAttribute('default-value')),
    disabled: el.hasAttribute('disabled'),
    orientation: (el.getAttribute('orientation') as accordion.Props['orientation']) ?? 'vertical',
  }),
  events: { onValueChange: 'valuechange', onFocusChange: 'focuschange' },
  rootProps: (api) => api.getRootProps(),
})
