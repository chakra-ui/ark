import { mergeProps } from '@zag-js/solid'
import { createSplitProps } from '../create-split-props'
import { ark, type ArkComponent, type HTMLArkProps } from '../factory'
import type { Assign } from '../types'
import { useMenuContext } from './menu-context'

interface ItemGroupLabelProps {
  for: string
}
export interface MenuItemGroupLabelProps extends Assign<HTMLArkProps<'div'>, ItemGroupLabelProps> {}

export const MenuItemGroupLabel: ArkComponent<'div', ItemGroupLabelProps> = (
  props: MenuItemGroupLabelProps,
) => {
  const menu = useMenuContext()
  const [labelProps, localProps] = createSplitProps<ItemGroupLabelProps>()(props, ['for'])

  const mergedProps = mergeProps(
    () => menu?.().getItemGroupLabelProps({ htmlFor: labelProps.for }),
    localProps,
  )

  return <ark.div {...mergedProps} />
}
