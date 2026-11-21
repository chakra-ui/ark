import type * as combobox from '@zag-js/combobox'

import { positionOf } from '../../utils/collection.js'
import { definePart, wrapped, wrappedButton } from '../../utils/define.js'
import { definePresencePart } from '../../utils/presence.js'
import { hasGroup, isFilteredOut, itemOf, root } from './shared.js'

definePart<combobox.Api>({
  tag: 'ark-combobox-label',
  root,
  props: (api) => api.getLabelProps(),
})

definePart<combobox.Api>({
  tag: 'ark-combobox-control',
  root,
  props: (api) => api.getControlProps(),
})

definePart<combobox.Api>({
  tag: 'ark-combobox-input',
  root,
  target: wrapped('input'),
  props: (api) => api.getInputProps(),
})

definePart<combobox.Api>({
  tag: 'ark-combobox-trigger',
  root,
  target: wrappedButton,
  props: (api) => api.getTriggerProps(),
})

definePart<combobox.Api>({
  tag: 'ark-combobox-clear-trigger',
  root,
  target: wrappedButton,
  props: (api) => api.getClearTriggerProps(),
})

definePresencePart<combobox.Api>({
  tag: 'ark-combobox-positioner',
  root,
  animates: false,
  props: (api) => api.getPositionerProps(),
})

definePresencePart<combobox.Api>({
  tag: 'ark-combobox-content',
  root,
  props: (api) => api.getContentProps(),
})

definePart<combobox.Api>({
  tag: 'ark-combobox-list',
  root,
  props: (api) => api.getListProps(),
})

definePart<combobox.Api>({
  tag: 'ark-combobox-empty',
  root,
  props: (api) => ({
    ...api.getEmptyProps(),
    hidden: api.collection.size > 0,
  }),
})

definePart<combobox.Api>({
  tag: 'ark-combobox-item-group',
  root,
  props: (api, el) => {
    const id = el.getAttribute('name') ?? ''
    return {
      ...api.getItemGroupProps({ id }),
      hidden: !hasGroup(api.collection, id),
    }
  },
})

definePart<combobox.Api>({
  tag: 'ark-combobox-item-group-label',
  root,
  props: (api, el) =>
    api.getItemGroupLabelProps({ htmlFor: el.closest('ark-combobox-item-group')?.getAttribute('name') ?? '' }),
})

definePart<combobox.Api>({
  tag: 'ark-combobox-item',
  root,
  // A wrapped link becomes the item
  target: wrapped('a'),
  display: 'block',
  props: (api, el) => {
    const item = itemOf(el)
    if (!item) return {}
    const value = api.collection.getItemValue(item) ?? ''
    return {
      ...api.getItemProps({ item }),
      ...positionOf(api.collection, value),
      hidden: isFilteredOut(el, value),
    }
  },
})

definePart<combobox.Api>({
  tag: 'ark-combobox-item-text',
  root,
  props: (api, el) => {
    const item = itemOf(el)
    return item ? api.getItemTextProps({ item }) : {}
  },
})

definePart<combobox.Api>({
  tag: 'ark-combobox-item-indicator',
  root,
  props: (api, el) => {
    const item = itemOf(el)
    return item ? api.getItemIndicatorProps({ item }) : {}
  },
})
