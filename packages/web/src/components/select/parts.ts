import type * as select from '@zag-js/select'

import { positionOf } from '../../utils/collection.js'
import { definePart, wrappedButton } from '../../utils/define.js'
import { definePresencePart } from '../../utils/presence.js'
import { itemOf, root, syncHiddenInputs } from './shared.js'

const itemStateOf = (api: select.Api, el: HTMLElement) => {
  const item = itemOf(el)
  return item ? api.getItemState({ item }) : undefined
}

export const SelectLabel = definePart<select.Api>({
  tag: 'ark-select-label',
  root,
  props: (api) => api.getLabelProps(),
})

export const SelectControl = definePart<select.Api>({
  tag: 'ark-select-control',
  root,
  props: (api) => api.getControlProps(),
})

export const SelectTrigger = definePart<select.Api, select.TriggerState>({
  tag: 'ark-select-trigger',
  root,
  target: wrappedButton,
  props: (api) => api.getTriggerProps(),
  state: (api) => api.getTriggerState(),
})

export const SelectValueText = definePart<select.Api>({
  tag: 'ark-select-value-text',
  root,
  attributes: ['placeholder'],
  props: (api) => api.getValueTextProps(),
  render: (api, el) => {
    const text = api.valueAsString || el.getAttribute('placeholder') || ''
    if (el.textContent !== text) el.textContent = text
  },
})

export const SelectIndicator = definePart<select.Api>({
  tag: 'ark-select-indicator',
  root,
  props: (api) => api.getIndicatorProps(),
})

export const SelectClearTrigger = definePart<select.Api>({
  tag: 'ark-select-clear-trigger',
  root,
  target: wrappedButton,
  props: (api) => api.getClearTriggerProps(),
})

export const SelectPositioner = definePresencePart<select.Api>({
  tag: 'ark-select-positioner',
  root,
  animates: false,
  props: (api) => api.getPositionerProps(),
})

export const SelectContent = definePresencePart<select.Api, select.ContentState>({
  tag: 'ark-select-content',
  root,
  props: (api) => api.getContentProps(),
  state: (api) => api.getContentState(),
})

export const SelectList = definePart<select.Api>({
  tag: 'ark-select-list',
  root,
  attributes: ['manual'],
  props: (api) => api.getListProps(),
})

export const SelectScrollArrow = definePart<select.Api>({
  tag: 'ark-select-scroll-arrow',
  root,
  attributes: ['placement'],
  props: (api, el) =>
    api.getScrollArrowProps({ placement: el.getAttribute('placement') === 'bottom' ? 'bottom' : 'top' }),
})

export const SelectItemGroup = definePart<select.Api>({
  tag: 'ark-select-item-group',
  root,
  attributes: ['name'],
  props: (api, el) => api.getItemGroupProps({ id: el.getAttribute('name') ?? '' }),
})

export const SelectItemGroupLabel = definePart<select.Api>({
  tag: 'ark-select-item-group-label',
  root,
  props: (api, el) =>
    api.getItemGroupLabelProps({ htmlFor: el.closest('ark-select-item-group')?.getAttribute('name') ?? '' }),
})

export const SelectItem = definePart<select.Api, select.ItemState | undefined>({
  tag: 'ark-select-item',
  root,
  attributes: ['value', 'disabled'],
  props: (api, el) => {
    const item = itemOf(el)
    if (!item) return {}
    return {
      ...api.getItemProps({ item }),
      ...positionOf(api.collection, api.collection.getItemValue(item)),
    }
  },
  state: (api, el) => itemStateOf(api, el),
})

export const SelectItemText = definePart<select.Api, select.ItemState | undefined>({
  tag: 'ark-select-item-text',
  root,
  props: (api, el) => {
    const item = itemOf(el)
    return item ? api.getItemTextProps({ item }) : {}
  },
  state: (api, el) => itemStateOf(api, el),
})

export const SelectItemIndicator = definePart<select.Api, select.ItemState | undefined>({
  tag: 'ark-select-item-indicator',
  root,
  props: (api, el) => {
    const item = itemOf(el)
    return item ? api.getItemIndicatorProps({ item }) : {}
  },
  state: (api, el) => itemStateOf(api, el),
})

export const SelectHiddenInput = definePart<select.Api>({
  tag: 'ark-select-hidden-input',
  root,
  display: 'contents',
  props: () => ({}),
  render: (api, el) => syncHiddenInputs(el, api),
})
