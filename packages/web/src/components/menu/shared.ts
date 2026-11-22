import { ListCollection } from '@zag-js/collection'
import type * as menu from '@zag-js/menu'
import { defineCollection, grouping, type Item } from '../../utils/collection.js'
import { rootOf, type RootElement } from '../../utils/define.js'
export const root = 'ark-menu'

export const collection = defineCollection<ListCollection>({
  item: 'ark-menu-item',
  itemText: 'ark-menu-item-text',
  list: 'ark-menu-list',
  itemGroup: 'ark-menu-item-group',
  itemGroupLabel: 'ark-menu-item-group-label',
  create: (items: Item[]) => new ListCollection({ items, ...grouping(items) }),
  itemType: (item: MenuCollectionItem) => item.type,
  itemTags: { checkbox: 'ark-menu-checkbox-item', radio: 'ark-menu-radio-item' },
  applyItem: (node, item: MenuCollectionItem) => {
    if (item.type === 'checkbox') node.toggleAttribute('checked', !!item.checked)
  },
  groupType: (items: MenuCollectionItem[]) => (items.every((item) => item.type === 'radio') ? 'radio' : undefined),
  groupTags: { radio: 'ark-menu-radio-item-group' },
  applyGroup: (node, items: MenuCollectionItem[]) => {
    if (node.localName !== 'ark-menu-radio-item-group') return
    node.setAttribute('value', items.find((item) => item.checked)?.value ?? '')
  },
})

export interface MenuCollectionItem {
  value: string
  type?: 'checkbox' | 'radio' | undefined
  checked?: boolean | undefined
}

export const itemSelector = 'ark-menu-item, ark-menu-checkbox-item, ark-menu-radio-item'

export type MenuElement = RootElement<menu.Api>

export const textOf = (item: Element) => (item.querySelector('ark-menu-item-text') ?? item).textContent?.trim() ?? ''

type MenubarElement = RootElement<{ getMenuContext(): menu.MenubarContext }>

export function menubarOf(el: MenuElement): menu.MenubarContext | undefined {
  const parent = el.parentElement
  if (!parent || rootOf(parent, root)) return undefined
  return rootOf<MenubarElement>(parent, 'ark-menubar')?.api?.getMenuContext()
}

export const parents = new WeakMap<MenuElement, MenuElement>()

export const submenus = new WeakMap<MenuElement, Set<MenuElement>>()

export function link(child: MenuElement) {
  const parent = child.parentElement && rootOf<MenuElement>(child.parentElement, root)
  if (!parent?.api || !child.api || !parent.service || !child.service) return
  const parentService = parent.service
  const childService = child.service
  parent.api.setChild(childService)
  child.api.setParent(parentService)
  parents.set(child, parent)
  let set = submenus.get(parent)
  if (!set) {
    set = new Set()
    submenus.set(parent, set)
  }
  set.add(child)
  return () => {
    set.delete(child)
    parents.delete(child)
    parent.api?.removeChild(childService)
  }
}
