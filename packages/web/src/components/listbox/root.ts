import * as listbox from '@zag-js/listbox'
import { defineRoot } from '../../utils/define.js'
import { collection, listOf, root } from './shared.js'

defineRoot<listbox.Api>({
  properties: ['scrollToIndexFn', 'ids', 'items'],
  propertyChanged: (el, name) => {
    if (name === 'items') collection.update(el)
  },

  tag: root,
  machine: listbox.machine,
  connect: listbox.connect,
  attributes: ['value', 'default-value', 'selection-mode', 'disabled', 'orientation'],
  props: (el) => ({
    collection: collection.get(el),
    value: listOf(el, 'value'),
    defaultValue: listOf(el, 'default-value'),
    selectionMode: (el.getAttribute('selection-mode') as listbox.Props['selectionMode']) ?? 'single',
    disabled: el.hasAttribute('disabled'),
    orientation: (el.getAttribute('orientation') as listbox.Props['orientation']) ?? 'vertical',
  }),
  events: { onHighlightChange: 'highlightchange', onValueChange: 'valuechange', onSelect: 'itemselect' },
  rootProps: (api) => api.getRootProps(),
  setup: (el) => collection.setup(el),
})
