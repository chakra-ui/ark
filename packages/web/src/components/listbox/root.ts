import * as listbox from '@zag-js/listbox'

import { str } from '../../utils/attrs.js'
import { defineRoot } from '../../utils/define.js'
import { collection, listOf, root } from './shared.js'

type SelectionMode = NonNullable<listbox.Props['selectionMode']>
type Orientation = NonNullable<listbox.Props['orientation']>

defineRoot<listbox.Api>({
  tag: root,
  machine: listbox.machine,
  connect: listbox.connect,

  attributes: ['value', 'default-value', 'selection-mode', 'disabled', 'orientation'],
  properties: ['scrollToIndexFn', 'ids'],
  ownProperties: ['collection'],
  propertyChanged: (el, name) => {
    if (name === 'collection') collection.update(el)
  },

  state: {
    value: {
      get: (api) => api.value,
      set: (api, value) => api.setValue(value),
    },
  },
  props: (el) => ({
    collection: collection.get(el),
    value: listOf(el, 'value'),
    defaultValue: listOf(el, 'default-value'),
    selectionMode: str<SelectionMode>(el, 'selection-mode') ?? 'single',
    disabled: el.hasAttribute('disabled'),
    orientation: str<Orientation>(el, 'orientation') ?? 'vertical',
  }),

  events: {
    onHighlightChange: 'highlightchange',
    onValueChange: 'valuechange',
    onSelect: 'itemselect',
  },

  rootProps: (api) => api.getRootProps(),
  setup: (el) => collection.setup(el),
})
