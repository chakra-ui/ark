import type { ItemProps } from '@zag-js/menu'
import { mergeProps } from '@zag-js/solid'
import { createSplitProps } from '../create-split-props'
import { ark, type HTMLArkProps } from '../factory'
import type { Assign } from '../types'
import { useMenuContext } from './menu-context'

export interface MenuItemProps extends Assign<HTMLArkProps<'div'>, ItemProps> {}

export const MenuItem = (props: MenuItemProps) => {
  const menu = useMenuContext()
  const [itemParams, restProps] = createSplitProps<ItemProps>()(props, [
    'id',
    'disabled',
    'valueText',
    'closeOnSelect',
  ])
  const mergedProps = mergeProps(() => menu?.().getItemProps(itemParams), restProps)

  return <ark.div {...mergedProps} />
}
