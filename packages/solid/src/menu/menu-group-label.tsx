import type { Assign } from '@polymorphic-factory/solid'
import { createSplitProps } from '../create-split-props'
import { ark, HTMLArkProps } from '../factory'
import { useMenuContext } from './menu-context'

type MenuGroupLabelParams = { htmlFor: string }
export type MenuGroupLabelProps = Assign<HTMLArkProps<'label'>, MenuGroupLabelParams>

export const MenuGroupLabel = (props: MenuGroupLabelProps) => {
  const menu = useMenuContext()
  const [labelProps, htmlProps] = createSplitProps<MenuGroupLabelParams>()(props, ['htmlFor'])

  return <ark.label {...menu?.()?.getLabelProps(labelProps)} {...htmlProps} />
}
