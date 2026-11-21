import type * as combobox from '@zag-js/combobox'
import { definePart, wrapped, wrappedButton } from '../../utils/define.js'
import { definePresencePart } from '../../utils/presence.js'
import { isFilteredOut, itemOf, root } from './shared.js'

definePart<combobox.Api>({ tag: 'ark-combobox-label', root, props: (api) => api.getLabelProps() })

definePart<combobox.Api>({ tag: 'ark-combobox-control', root, props: (api) => api.getControlProps() })

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

definePresencePart<combobox.Api>({ tag: 'ark-combobox-content', root, props: (api) => api.getContentProps() })

definePart<combobox.Api>({ tag: 'ark-combobox-list', root, props: (api) => api.getListProps() })

definePart<combobox.Api>({
  tag: 'ark-combobox-empty',
  root,
  props: (api) => ({ ...api.getEmptyProps(), hidden: api.collection.size > 0 }),
})

definePart<combobox.Api>({
  tag: 'ark-combobox-item-group',
  root,
  props: (api, el) => {
    const id = el.getAttribute('name') ?? ''
    const empty = !api.collection.items.some((item) => item.group === id)
    return { ...api.getItemGroupProps({ id }), hidden: empty }
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
    return { ...api.getItemProps({ item }), hidden: isFilteredOut(el, item.value) }
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
