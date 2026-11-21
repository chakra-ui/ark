import type * as combobox from '@zag-js/combobox'
import { definePart, wrapped } from '../../utils/define.js'
import { isFilteredOut, itemOf, root } from './shared.js'

definePart<combobox.Api>({ tag: 'ark-command-label', root, props: (api) => api.getLabelProps() })

definePart<combobox.Api>({ tag: 'ark-command-control', root, props: (api) => api.getControlProps() })

definePart<combobox.Api>({
  tag: 'ark-command-input',
  root,
  target: wrapped('input'),
  props: (api) => api.getInputProps(),
})

// Keep focus in the input when an item is pressed
const keepFocus = (event: PointerEvent) => {
  if (event.button === 0) event.preventDefault()
}

definePart<combobox.Api>({
  tag: 'ark-command-list',
  root,
  props: (api) => ({ ...api.getListProps(), onpointerdown: keepFocus }),
})

definePart<combobox.Api>({
  tag: 'ark-command-empty',
  root,
  props: (api) => ({ ...api.getEmptyProps(), hidden: api.collection.size > 0 }),
})

definePart<combobox.Api>({
  tag: 'ark-command-item-group',
  root,
  props: (api, el) => {
    const id = el.getAttribute('name') ?? ''
    const empty = !api.collection.items.some((item) => item.group === id)
    return { ...api.getItemGroupProps({ id }), hidden: empty }
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
    return { ...api.getItemProps({ item, persistFocus: true }), hidden: isFilteredOut(el, item.value) }
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
