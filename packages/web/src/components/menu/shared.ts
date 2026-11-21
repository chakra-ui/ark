import type * as menu from '@zag-js/menu'
import { rootOf, type RootElement } from '../../utils/define.js'
export const root = 'ark-menu'

export const itemSelector = 'ark-menu-item, ark-menu-checkbox-item, ark-menu-radio-item'

export type MenuElement = RootElement<menu.Api>

export const queries = new WeakMap<MenuElement, string>()

export const textOf = (item: Element) => (item.querySelector('ark-menu-item-text') ?? item).textContent?.trim() ?? ''

export function filteredOut(item: Element) {
  const query = queries.get(rootOf<MenuElement>(item, root)!)?.toLocaleLowerCase()
  return !!query && !textOf(item).toLocaleLowerCase().includes(query)
}

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
