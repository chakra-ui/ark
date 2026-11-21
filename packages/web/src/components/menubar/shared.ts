import type * as menubar from '@zag-js/menubar'

import { str } from '../../utils/attrs.js'
import { rootOf } from '../../utils/define.js'
import type { MenuElement } from '../menu/index.js'

export const root = 'ark-menubar'

type Dir = NonNullable<menubar.Props['dir']>

export const dirOf = (el: Element): Dir | undefined => {
  const own = str<Dir>(el, 'dir')
  if (own) return own

  const inherited = el.parentElement?.closest('[dir]')?.getAttribute('dir')
  return (inherited as Dir | null) ?? undefined
}

const isTopLevel = (menu: MenuElement) => !menu.parentElement || !rootOf(menu.parentElement, 'ark-menu')

export const menusOf = (el: HTMLElement) => [...el.querySelectorAll<MenuElement>('ark-menu')].filter(isTopLevel)

const itemSelector = '[role=menuitem]'
const triggerSelector = '[role=menuitem][data-menu-trigger]'

/** Zag finds the menubar's triggers with `[role=menuitem]`, which in light DOM also matches the menus' items. */
export function scopeTriggerQuery(el: HTMLElement) {
  const query = (selectors: string) =>
    HTMLElement.prototype.querySelectorAll.call(el, selectors === itemSelector ? triggerSelector : selectors)

  Object.defineProperty(el, 'querySelectorAll', { configurable: true, value: query })
  return () => {
    delete (el as Partial<HTMLElement>).querySelectorAll
  }
}
