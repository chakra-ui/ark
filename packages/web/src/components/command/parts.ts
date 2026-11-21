import type * as combobox from '@zag-js/combobox'

import { positionOf } from '../../utils/collection.js'
import { definePart, wrapped } from '../../utils/define.js'
import { hasGroup, isFilteredOut, itemOf, root } from './shared.js'

definePart<combobox.Api>({
  tag: 'ark-command-label',
  root,
  props: (api) => api.getLabelProps(),
})

definePart<combobox.Api>({
  tag: 'ark-command-control',
  root,
  props: (api) => api.getControlProps(),
})

definePart<combobox.Api>({
  tag: 'ark-command-input',
  root,
  target: wrapped('input'),
  props: (api) => api.getInputProps(),
})

const keepFocus = (event: PointerEvent) => {
  if (event.button === 0) event.preventDefault()
}

definePart<combobox.Api>({
  tag: 'ark-command-list',
  root,
  props: (api) => ({
    ...api.getListProps(),
    onpointerdown: keepFocus,
  }),
})

definePart<combobox.Api>({
  tag: 'ark-command-empty',
  root,
  props: (api) => ({
    ...api.getEmptyProps(),
    hidden: api.collection.size > 0,
  }),
})

definePart<combobox.Api>({
  tag: 'ark-command-item-group',
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
  tag: 'ark-command-item-group-label',
  root,
  props: (api, el) =>
    api.getItemGroupLabelProps({ htmlFor: el.closest('ark-command-item-group')?.getAttribute('name') ?? '' }),
})

definePart<combobox.Api>({
  tag: 'ark-command-item',
  root,
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
})

definePart<combobox.Api>({
  tag: 'ark-command-item-text',
  root,
  props: (api, el) => {
    const item = itemOf(el)
    return item ? api.getItemTextProps({ item }) : {}
  },
})
