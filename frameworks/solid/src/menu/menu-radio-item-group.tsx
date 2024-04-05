import { mergeProps } from '@zag-js/solid'
import { createUniqueId } from 'solid-js'
import { createSplitProps } from '../create-split-props'
import { ark, type HTMLArkProps } from '../factory'
import { type Assign, type Optional } from '../types'
import { useMenuContext } from './use-menu-context'
import { MenuItemGroupProvider, type UseMenuItemGroupContext } from './use-menu-item-group-context'

type OptionalUseMenuItemGroupContext = Optional<UseMenuItemGroupContext, 'id'>

export interface MenuRadioItemGroupProps
  extends Assign<HTMLArkProps<'div'>, OptionalUseMenuItemGroupContext> {}

export const MenuRadioItemGroup = (props: MenuRadioItemGroupProps) => {
  const [optionalItemGroupProps, localProps] = createSplitProps<OptionalUseMenuItemGroupContext>()(
    props,
    ['id', 'onValueChange', 'value'],
  )
  const context = useMenuContext()
  const itemGroupProps = mergeProps({ id: createUniqueId() }, optionalItemGroupProps)
  const mergedProps = mergeProps(() => context().getItemGroupProps(itemGroupProps), localProps)

  return (
    <MenuItemGroupProvider value={itemGroupProps}>
      <ark.div {...mergedProps} />
    </MenuItemGroupProvider>
  )
}
