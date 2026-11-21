import * as select from '@zag-js/select'

import { positioning, positioningAttributes, str } from '../../utils/attrs.js'
import { definePresenceRoot } from '../../utils/presence.js'
import { withField } from '../../utils/field.js'
import { collection, hiddenSelects, listOf, root, syncHiddenSelect, usesHiddenInput } from './shared.js'

definePresenceRoot<select.Api>({
  tag: root,
  machine: select.machine,
  connect: select.connect,
  present: (api) => api.open,

  attributes: [
    'value',
    'default-value',
    'multiple',
    'disabled',
    'invalid',
    'name',
    'required',
    'align-item-with-trigger',
    'fit-viewport',
    ...positioningAttributes,
  ],
  properties: ['scrollToIndexFn', 'initialFocusEl', 'ids', 'translations', 'positioning'],
  ownProperties: ['collection'],
  propertyChanged: (el, name) => {
    if (name === 'collection') collection.update(el)
  },

  state: {
    open: {
      get: (api) => api.open,
      set: (api, open) => api.setOpen(!!open),
    },
    value: {
      get: (api) => api.value,
      set: (api, value) => api.setValue(value),
    },
  },

  actions: {
    clearValue: (api, value?: string) => api.clearValue(value),
  },

  props: (el) =>
    withField(el, 'hiddenSelect', {
      collection: collection.get(el),
      value: listOf(el, 'value'),
      defaultValue: listOf(el, 'default-value'),
      multiple: el.hasAttribute('multiple'),
      disabled: el.hasAttribute('disabled'),
      invalid: el.hasAttribute('invalid'),
      required: el.hasAttribute('required'),
      name: str(el, 'name'),
      alignItemWithTrigger: el.hasAttribute('align-item-with-trigger'),
      positioning: { ...positioning(el), ...(el.hasAttribute('fit-viewport') && { fitViewport: true }) },
    }),

  events: {
    onSelect: 'itemselect',
    onHighlightChange: 'highlightchange',
    onValueChange: 'valuechange',
    onOpenChange: 'openchange',
    onPointerDownOutside: 'pointerdownoutside',
    onFocusOutside: 'focusoutside',
    onInteractOutside: 'interactoutside',
  },

  rootProps: (api) => api.getRootProps(),
  setup: (el) => {
    const cleanup = collection.setup(el)
    if (usesHiddenInput(el)) return cleanup

    const hidden = el.ownerDocument.createElement('select')
    el.append(hidden)
    hiddenSelects.set(el, hidden)
    return () => {
      cleanup()
      hidden.remove()
    }
  },
  render: (api, el) => {
    const hidden = hiddenSelects.get(el)
    if (hidden) syncHiddenSelect(el, hidden, api)
  },
})
