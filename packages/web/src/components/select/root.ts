import * as select from '@zag-js/select'
import { positioning, positioningAttributes, str } from '../../utils/attrs.js'
import { definePresenceRoot } from '../../utils/presence.js'
import { collection, hiddenSelects, listOf, root, syncHiddenSelect } from './shared.js'

definePresenceRoot<select.Api>({
  properties: ['scrollToIndexFn', 'initialFocusEl', 'ids', 'translations', 'positioning', 'items'],
  propertyChanged: (el, name) => {
    if (name === 'items') collection.update(el)
  },

  tag: root,
  present: (api) => api.open,
  machine: select.machine,
  connect: select.connect,
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
  props: (el) => ({
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
