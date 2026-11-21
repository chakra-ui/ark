import type * as listbox from '@zag-js/listbox'

import { positionOf } from '../../utils/collection.js'
import { definePart, wrapped } from '../../utils/define.js'
import { itemOf, root } from './shared.js'

definePart<listbox.Api>({
  tag: 'ark-listbox-label',
  root,
  props: (api) => api.getLabelProps(),
})

definePart<listbox.Api>({
  tag: 'ark-listbox-value-text',
  root,
  display: 'inline',
  props: (api) => api.getValueTextProps(),
  render: (api, el) => {
    const text = api.valueAsString || el.getAttribute('placeholder') || ''
    if (el.textContent !== text) el.textContent = text
  },
})

definePart<listbox.Api>({
  tag: 'ark-listbox-input',
  root,
  target: wrapped('input'),
  props: (api) => api.getInputProps(),
})

definePart<listbox.Api>({
  tag: 'ark-listbox-content',
  root,
  props: (api) => api.getContentProps(),
})

definePart<listbox.Api>({
  tag: 'ark-listbox-empty',
  root,
  props: (api) => ({
    ...api.getEmptyProps(),
    hidden: api.collection.size > 0,
  }),
})

definePart<listbox.Api>({
  tag: 'ark-listbox-list',
  root,
  props: (api) => api.getListProps(),
})

definePart<listbox.Api>({
  tag: 'ark-listbox-item-group',
  root,
  props: (api, el) => api.getItemGroupProps({ id: el.getAttribute('name') ?? '' }),
})

definePart<listbox.Api>({
  tag: 'ark-listbox-item-group-label',
  root,
  props: (api, el) =>
    api.getItemGroupLabelProps({ htmlFor: el.closest('ark-listbox-item-group')?.getAttribute('name') ?? '' }),
})

definePart<listbox.Api>({
  tag: 'ark-listbox-item',
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

definePart<listbox.Api>({
  tag: 'ark-listbox-item-text',
  root,
  props: (api, el) => {
    const item = itemOf(el)
    return item ? api.getItemTextProps({ item }) : {}
  },
})

definePart<listbox.Api>({
  tag: 'ark-listbox-item-indicator',
  root,
  props: (api, el) => {
    const item = itemOf(el)
    return item ? api.getItemIndicatorProps({ item }) : {}
  },
})
