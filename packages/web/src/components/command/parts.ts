import type * as combobox from '@zag-js/combobox'

import { positionOf } from '../../utils/collection.js'
import { definePart, wrapped } from '../../utils/define.js'
import { hasGroup, isFilteredOut, itemOf, root } from './shared.js'

export const CommandLabel = definePart<combobox.Api>({
  tag: 'ark-command-label',
  root,
  props: (api) => api.getLabelProps(),
})

export const CommandControl = definePart<combobox.Api>({
  tag: 'ark-command-control',
  root,
  props: (api) => api.getControlProps(),
})

export const CommandInput = definePart<combobox.Api>({
  tag: 'ark-command-input',
  root,
  target: wrapped('input'),
  props: (api) => api.getInputProps(),
})

const itemStateOf = (api: combobox.Api, el: HTMLElement, persistFocus?: boolean) => {
  const item = itemOf(el)
  return item ? api.getItemState({ item, persistFocus }) : undefined
}

const keepFocus = (event: PointerEvent) => {
  if (event.button === 0) event.preventDefault()
}

export const CommandList = definePart<combobox.Api>({
  tag: 'ark-command-list',
  root,
  attributes: ['manual'],
  props: (api) => ({
    ...api.getListProps(),
    onpointerdown: keepFocus,
  }),
})

export const CommandEmpty = definePart<combobox.Api>({
  tag: 'ark-command-empty',
  root,
  props: (api) => ({
    ...api.getEmptyProps(),
    hidden: api.collection.size > 0,
  }),
})

export const CommandItemGroup = definePart<combobox.Api>({
  tag: 'ark-command-item-group',
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

export const CommandItemGroupLabel = definePart<combobox.Api>({
  tag: 'ark-command-item-group-label',
  root,
  props: (api, el) =>
    api.getItemGroupLabelProps({ htmlFor: el.closest('ark-command-item-group')?.getAttribute('name') ?? '' }),
})

export const CommandItem = definePart<combobox.Api, combobox.ItemState | undefined>({
  tag: 'ark-command-item',
  root,
  attributes: ['value', 'disabled', 'keywords', 'parent'],
  target: wrapped('a'),
  display: 'block',
  props: (api, el) => {
    const item = itemOf(el)
    if (!item) return {}
    const value = api.collection.getItemValue(item) ?? ''
    return {
      ...api.getItemProps({ item, persistFocus: true }),
      ...positionOf(api.collection, value),
      hidden: isFilteredOut(el, value),
    }
  },
  state: (api, el) => itemStateOf(api, el, true),
})

export const CommandItemText = definePart<combobox.Api, combobox.ItemState | undefined>({
  tag: 'ark-command-item-text',
  root,
  props: (api, el) => {
    const item = itemOf(el)
    return item ? api.getItemTextProps({ item }) : {}
  },
  state: (api, el) => itemStateOf(api, el),
})
