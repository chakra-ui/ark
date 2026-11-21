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
