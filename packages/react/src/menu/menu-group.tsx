import { forwardRef } from '@polymorphic-factory/react'
import { mergeProps } from '@zag-js/react'
import { createSplitProps } from '../create-split-props'
import { ark, HTMLArkProps } from '../factory'
import type { Assign } from '../types'
import { useMenuContext } from './menu-context'
import type { UseMenuReturn } from './use-menu'

type MenuGroupParams = Parameters<UseMenuReturn['api']['getGroupProps']>[0]
export type MenuGroupProps = Assign<HTMLArkProps<'div'>, MenuGroupParams>

export const MenuGroup = forwardRef<'div', MenuGroupProps>((props, ref) => {
  const api = useMenuContext() as UseMenuReturn['api']
  const [menuGroupProps, divProps] = createSplitProps<MenuGroupParams>()(props, ['id'])
  const mergedProps = mergeProps(api?.getGroupProps(menuGroupProps) ?? {}, divProps)
  return <ark.div {...mergedProps} ref={ref} />
})
