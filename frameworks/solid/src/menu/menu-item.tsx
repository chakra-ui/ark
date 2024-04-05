import type { ItemProps } from '@zag-js/menu'
import { mergeProps } from '@zag-js/solid'
import { createSplitProps } from '../create-split-props'
import { ark, type HTMLArkProps } from '../factory'
import type { Assign } from '../types'
import { useMenuContext } from './use-menu-context'

export interface MenuItemProps extends Assign<HTMLArkProps<'div'>, ItemProps> {}

export const MenuItem = (props: MenuItemProps) => {
  const menu = useMenuContext()
  const [itemProps, restProps] = createSplitProps<ItemProps>()(props, [
    'closeOnSelect',
    'disabled',
    'value',
    'valueText',
  ])
  const mergedProps = mergeProps(() => menu?.().getItemProps(itemProps), restProps)

  return <ark.div {...mergedProps} />
}
