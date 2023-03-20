import { type Assign } from '@polymorphic-factory/solid'
import { createSplitProps } from '../create-split-props'
import { ark, type HTMLArkProps } from '../factory'
import { useMenuContext } from './menu-context'

type MenuItemGroupLabelParams = { htmlFor: string }
export type MenuItemGroupLabelProps = Assign<HTMLArkProps<'label'>, MenuItemGroupLabelParams>

export const MenuItemGroupLabel = (props: MenuItemGroupLabelProps) => {
  const menu = useMenuContext()
  const [itemGroupLabelProps, labelProps] = createSplitProps<MenuItemGroupLabelParams>()(props, [
    'htmlFor',
  ])

  return <ark.label {...menu?.()?.getItemGroupLabelProps(itemGroupLabelProps)} {...labelProps} />
}
