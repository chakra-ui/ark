import type { GridCollection, ListCollection } from '@zag-js/collection'
import * as listbox from '@zag-js/listbox'

import { defineCollection, grouping, type Item } from '../../utils/collection.js'

import { rootOf } from '../../utils/define.js'
export const root = 'ark-listbox'

const columnsOf = (el: HTMLElement) => Number(el.getAttribute('columns'))

export const collection = defineCollection<ListCollection | GridCollection>({
  item: 'ark-listbox-item',
  itemText: 'ark-listbox-item-text',
  list: 'ark-listbox-list',
  itemGroup: 'ark-listbox-item-group',
  itemGroupLabel: 'ark-listbox-item-group-label',
  attributes: ['columns'],
  create: (items: Item[], el) => {
    const options = { items, ...grouping(items) }
    const columnCount = columnsOf(el)
    if (columnCount > 0) return listbox.gridCollection({ ...options, columnCount })
    return listbox.collection(options)
  },
})

export const itemOf = (part: HTMLElement) => {
  const value = collection.valueOf(part)
  const rootEl = rootOf<HTMLElement>(part, root)
  return value != null && rootEl ? collection.get(rootEl)?.find(value) : null
}

export const listOf = (el: Element, name: string) => {
  const attr = el.getAttribute(name)
  if (attr == null) return undefined
  return attr ? attr.split(',').map((value) => value.trim()) : []
}
