import type * as listbox from '@zag-js/listbox'

import { positionOf } from '../../utils/collection.js'
import { definePart, wrapped } from '../../utils/define.js'
import { itemOf, root } from './shared.js'

const itemStateOf = (api: listbox.Api, el: HTMLElement) => {
  const item = itemOf(el)
  return item ? api.getItemState({ item }) : undefined
}

export const ListboxLabel = definePart<listbox.Api>({
  tag: 'ark-listbox-label',
  root,
  props: (api) => api.getLabelProps(),
})

export const ListboxValueText = definePart<listbox.Api>({
  tag: 'ark-listbox-value-text',
  root,
  attributes: ['placeholder'],
  display: 'inline',
  props: (api) => api.getValueTextProps(),
  render: (api, el) => {
    const text = api.valueAsString || el.getAttribute('placeholder') || ''
    if (el.textContent !== text) el.textContent = text
  },
})

export const ListboxInput = definePart<listbox.Api>({
  tag: 'ark-listbox-input',
  root,
  target: wrapped('input'),
  props: (api) => api.getInputProps(),
})

export const ListboxContent = definePart<listbox.Api, listbox.ContentState>({
  tag: 'ark-listbox-content',
  root,
  props: (api) => api.getContentProps(),
  state: (api) => api.getContentState(),
})

export const ListboxEmpty = definePart<listbox.Api>({
  tag: 'ark-listbox-empty',
  root,
  props: (api) => ({
    ...api.getEmptyProps(),
    hidden: api.collection.size > 0,
  }),
})

export const ListboxList = definePart<listbox.Api, listbox.ListState>({
  tag: 'ark-listbox-list',
  root,
  attributes: ['manual'],
  props: (api) => api.getListProps(),
  state: (api) => api.getListState(),
})

export const ListboxItemGroup = definePart<listbox.Api>({
  tag: 'ark-listbox-item-group',
  root,
  attributes: ['name'],
  props: (api, el) => api.getItemGroupProps({ id: el.getAttribute('name') ?? '' }),
})

export const ListboxItemGroupLabel = definePart<listbox.Api>({
  tag: 'ark-listbox-item-group-label',
  root,
  props: (api, el) =>
    api.getItemGroupLabelProps({ htmlFor: el.closest('ark-listbox-item-group')?.getAttribute('name') ?? '' }),
})

export const ListboxItem = definePart<listbox.Api, listbox.ItemState | undefined>({
  tag: 'ark-listbox-item',
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

export const ListboxItemText = definePart<listbox.Api, listbox.ItemState | undefined>({
  tag: 'ark-listbox-item-text',
  root,
  props: (api, el) => {
    const item = itemOf(el)
    return item ? api.getItemTextProps({ item }) : {}
  },
  state: (api, el) => itemStateOf(api, el),
})

export const ListboxItemIndicator = definePart<listbox.Api, listbox.ItemState | undefined>({
  tag: 'ark-listbox-item-indicator',
  root,
  props: (api, el) => {
    const item = itemOf(el)
    return item ? api.getItemIndicatorProps({ item }) : {}
  },
  state: (api, el) => itemStateOf(api, el),
})
