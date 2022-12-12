import { forwardRef } from '@polymorphic-factory/react'
import { mergeProps } from '@zag-js/react'
import { createSplitProps } from '../create-split-props'
import { ark, HTMLArkProps } from '../factory'
import type { Assign } from '../types'
import { useMenuContext } from './menu-context'
import type { UseMenuReturn } from './use-menu'

type MenuItemGroupLabelParams = { htmlFor: string }
export type MenuItemGroupLabelProps = Assign<HTMLArkProps<'label'>, MenuItemGroupLabelParams>

export const MenuItemGroupLabel = forwardRef<'label', MenuItemGroupLabelProps>((props, ref) => {
  const api = useMenuContext() as UseMenuReturn['api']
  const [labelProps, htmlProps] = createSplitProps<MenuItemGroupLabelParams>()(props, ['htmlFor'])
  const mergedProps = mergeProps(api?.getGroupLabelProps(labelProps) ?? {}, htmlProps)

  return <ark.label {...mergedProps} ref={ref} />
})
