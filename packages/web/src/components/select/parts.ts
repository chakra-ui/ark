import type * as select from '@zag-js/select'

import { positionOf } from '../../utils/collection.js'
import { definePart, wrappedButton } from '../../utils/define.js'
import { definePresencePart } from '../../utils/presence.js'
import { itemOf, root, syncHiddenInputs } from './shared.js'

definePart<select.Api>({
  tag: 'ark-select-label',
  root,
  props: (api) => api.getLabelProps(),
})

definePart<select.Api>({
  tag: 'ark-select-control',
  root,
  props: (api) => api.getControlProps(),
})

definePart<select.Api>({
  tag: 'ark-select-trigger',
  root,
  target: wrappedButton,
  props: (api) => api.getTriggerProps(),
})

definePart<select.Api>({
  tag: 'ark-select-value-text',
  root,
  props: (api) => api.getValueTextProps(),
  render: (api, el) => {
    const text = api.valueAsString || el.getAttribute('placeholder') || ''
    if (el.textContent !== text) el.textContent = text
  },
})

definePart<select.Api>({
  tag: 'ark-select-indicator',
  root,
  props: (api) => api.getIndicatorProps(),
})

definePart<select.Api>({
  tag: 'ark-select-clear-trigger',
  root,
  target: wrappedButton,
  props: (api) => api.getClearTriggerProps(),
})

definePresencePart<select.Api>({
  tag: 'ark-select-positioner',
  root,
  animates: false,
  props: (api) => api.getPositionerProps(),
})

definePresencePart<select.Api>({
  tag: 'ark-select-content',
  root,
  props: (api) => api.getContentProps(),
})

definePart<select.Api>({
  tag: 'ark-select-list',
  root,
  props: (api) => api.getListProps(),
})

definePart<select.Api>({
  tag: 'ark-select-scroll-arrow',
  root,
  props: (api, el) =>
    api.getScrollArrowProps({ placement: el.getAttribute('placement') === 'bottom' ? 'bottom' : 'top' }),
})

definePart<select.Api>({
  tag: 'ark-select-item-group',
  root,
  props: (api, el) => api.getItemGroupProps({ id: el.getAttribute('name') ?? '' }),
})

definePart<select.Api>({
  tag: 'ark-select-item-group-label',
  root,
  props: (api, el) =>
    api.getItemGroupLabelProps({ htmlFor: el.closest('ark-select-item-group')?.getAttribute('name') ?? '' }),
})

definePart<select.Api>({
  tag: 'ark-select-item',
  root,
  props: (api, el) => {
    const item = itemOf(el)
    if (!item) return {}
    return {
      ...api.getItemProps({ item }),
      ...positionOf(api.collection, api.collection.getItemValue(item)),
    }
  },
})

definePart<select.Api>({
  tag: 'ark-select-item-text',
  root,
  props: (api, el) => {
    const item = itemOf(el)
    return item ? api.getItemTextProps({ item }) : {}
  },
})

definePart<select.Api>({
  tag: 'ark-select-item-indicator',
  root,
  props: (api, el) => {
    const item = itemOf(el)
    return item ? api.getItemIndicatorProps({ item }) : {}
  },
})

definePart<select.Api>({
  tag: 'ark-select-hidden-input',
  root,
  display: 'contents',
  props: () => ({}),
  render: (api, el) => syncHiddenInputs(el, api),
})
