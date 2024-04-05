import type { ItemGroupProps } from '@zag-js/menu'
import { mergeProps } from '@zag-js/solid'
import { createUniqueId } from 'solid-js'
import { createSplitProps } from '../create-split-props'
import { ark, type HTMLArkProps } from '../factory'
import type { Assign, Optional } from '../types'
import { useMenuContext } from './use-menu-context'
import { MenuItemGroupProvider } from './use-menu-item-group-context'

type OptionalItemGroupProps = Optional<ItemGroupProps, 'id'>

export interface MenuItemGroupProps extends Assign<HTMLArkProps<'div'>, OptionalItemGroupProps> {}

export const MenuItemGroup = (props: MenuItemGroupProps) => {
  const [optionalItemGroupProps, localProps] = createSplitProps<OptionalItemGroupProps>()(props, [
    'id',
  ])
  const itemGroupProps = mergeProps({ id: createUniqueId() }, optionalItemGroupProps)
  const menu = useMenuContext()
  const mergedProps = mergeProps(() => menu().getItemGroupProps(itemGroupProps), localProps)

  return (
    <MenuItemGroupProvider value={itemGroupProps}>
      <ark.div {...mergedProps} />
    </MenuItemGroupProvider>
  )
}
