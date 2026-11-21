import type * as combobox from '@zag-js/combobox'

import { positionOf } from '../../utils/collection.js'
import { definePart, wrapped, wrappedButton } from '../../utils/define.js'
import { definePresencePart } from '../../utils/presence.js'
import { hasGroup, isFilteredOut, itemOf, root } from './shared.js'

const itemStateOf = (api: combobox.Api, el: HTMLElement) => {
  const item = itemOf(el)
  return item ? api.getItemState({ item }) : undefined
}

export const ComboboxLabel = definePart<combobox.Api>({
  tag: 'ark-combobox-label',
  root,
  props: (api) => api.getLabelProps(),
})

export const ComboboxControl = definePart<combobox.Api>({
  tag: 'ark-combobox-control',
  root,
  props: (api) => api.getControlProps(),
})

export const ComboboxInput = definePart<combobox.Api>({
  tag: 'ark-combobox-input',
  root,
  target: wrapped('input'),
  props: (api) => api.getInputProps(),
})

export const ComboboxTrigger = definePart<combobox.Api, combobox.TriggerState>({
  tag: 'ark-combobox-trigger',
  root,
  target: wrappedButton,
  props: (api) => api.getTriggerProps(),
  state: (api) => api.getTriggerState(),
})

export const ComboboxClearTrigger = definePart<combobox.Api>({
  tag: 'ark-combobox-clear-trigger',
  root,
  target: wrappedButton,
  props: (api) => api.getClearTriggerProps(),
})

export const ComboboxPositioner = definePresencePart<combobox.Api>({
  tag: 'ark-combobox-positioner',
  root,
  animates: false,
  props: (api) => api.getPositionerProps(),
})

export const ComboboxContent = definePresencePart<combobox.Api, combobox.ContentState>({
  tag: 'ark-combobox-content',
  root,
  props: (api) => api.getContentProps(),
  state: (api) => api.getContentState(),
})

export const ComboboxList = definePart<combobox.Api>({
  tag: 'ark-combobox-list',
  root,
  attributes: ['manual'],
  props: (api) => api.getListProps(),
})

export const ComboboxEmpty = definePart<combobox.Api>({
  tag: 'ark-combobox-empty',
  root,
  props: (api) => ({
    ...api.getEmptyProps(),
    hidden: api.collection.size > 0,
  }),
})

export const ComboboxItemGroup = definePart<combobox.Api>({
  tag: 'ark-combobox-item-group',
  root,
  attributes: ['name'],
  props: (api, el) => {
    const id = el.getAttribute('name') ?? ''
    return {
      ...api.getItemGroupProps({ id }),
      hidden: !hasGroup(api.collection, id),
    }
  },
})

export const ComboboxItemGroupLabel = definePart<combobox.Api>({
  tag: 'ark-combobox-item-group-label',
  root,
  props: (api, el) =>
    api.getItemGroupLabelProps({ htmlFor: el.closest('ark-combobox-item-group')?.getAttribute('name') ?? '' }),
})

export const ComboboxItem = definePart<combobox.Api, combobox.ItemState | undefined>({
  tag: 'ark-combobox-item',
  root,
  attributes: ['value', 'disabled'],
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
  state: (api, el) => itemStateOf(api, el),
})

export const ComboboxItemText = definePart<combobox.Api, combobox.ItemState | undefined>({
  tag: 'ark-combobox-item-text',
  root,
  props: (api, el) => {
    const item = itemOf(el)
    return item ? api.getItemTextProps({ item }) : {}
  },
  state: (api, el) => itemStateOf(api, el),
})

export const ComboboxItemIndicator = definePart<combobox.Api, combobox.ItemState | undefined>({
  tag: 'ark-combobox-item-indicator',
  root,
  props: (api, el) => {
    const item = itemOf(el)
    return item ? api.getItemIndicatorProps({ item }) : {}
  },
  state: (api, el) => itemStateOf(api, el),
})
