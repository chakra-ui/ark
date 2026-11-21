import * as listbox from '@zag-js/listbox'
import { defineCollection, grouping, type Item } from '../../utils/collection.js'
export const root = 'ark-listbox'

export const collection = defineCollection({
  item: 'ark-listbox-item',
  itemText: 'ark-listbox-item-text',
  list: 'ark-listbox-list',
  itemGroup: 'ark-listbox-item-group',
  itemGroupLabel: 'ark-listbox-item-group-label',
  attributes: ['columns'],
  create: (items, el) => {
    const options = {
      items,
      ...grouping(items),
      itemToValue: (item: Item) => item.value,
      itemToString: (item: Item) => item.label,
      isItemDisabled: (item: Item) => item.disabled,
    }
    const columnCount = Number(el.getAttribute('columns'))
    return columnCount > 0
      ? listbox.gridCollection<Item>({ ...options, columnCount })
      : listbox.collection<Item>(options)
  },
})

export const itemOf = (part: HTMLElement) => {
  const value = collection.valueOf(part)
  const rootEl = part.closest<HTMLElement>(root)
  return value != null && rootEl ? collection.get(rootEl)?.find(value) : null
}

export const listOf = (el: Element, name: string) => {
  const attr = el.getAttribute(name)
  if (attr == null) return undefined
  return attr ? attr.split(',').map((value) => value.trim()) : []
}
