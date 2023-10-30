import { mergeProps } from '@zag-js/solid'
import { createSplitProps } from '../create-split-props'
import { ark, type HTMLArkProps } from '../factory'
import type { Assign } from '../types'
import { useMenuContext } from './menu-context'

type MenuItemGroupLabelParams = { for: string }
export type MenuItemGroupLabelProps = Assign<HTMLArkProps<'label'>, MenuItemGroupLabelParams>

export const MenuItemGroupLabel = (props: MenuItemGroupLabelProps) => {
  const menu = useMenuContext()

  const [itemGroupLabelProps, localProps] = createSplitProps<MenuItemGroupLabelParams>()(props, [
    'for',
  ])

  const labelProps = mergeProps(
    () => menu?.().getItemGroupLabelProps(itemGroupLabelProps),
    localProps,
  )

  return <ark.label {...labelProps} />
}
