import type { Assign } from '@polymorphic-factory/solid'
import { createSplitProps } from '../create-split-props'
import { ark, HTMLArkProps } from '../factory'
import { useMenuContext } from './menu-context'
import type { UseMenuReturn } from './use-menu'

type MenuGroupLabelParams = { htmlFor: string }
export type MenuGroupLabelProps = Assign<HTMLArkProps<'label'>, MenuGroupLabelParams>

export const MenuGroupLabel = (props: MenuGroupLabelProps) => {
  const api = useMenuContext() as () => ReturnType<UseMenuReturn>['api']
  const [labelProps, htmlProps] = createSplitProps<MenuGroupLabelParams>()(props, ['htmlFor'])

  return <ark.label {...api?.()?.getLabelProps(labelProps)} {...htmlProps} />
}
