import { mergeProps } from '@zag-js/solid'
import { createUniqueId } from 'solid-js'
import type { Optional } from '../../types'
import { createSplitProps } from '../../utils/create-split-props'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useMenuContext } from './use-menu-context'
import { MenuItemGroupProvider, type UseMenuItemGroupContext } from './use-menu-item-group-context'

type OptionalUseMenuItemGroupContext = Optional<UseMenuItemGroupContext, 'id'>

export interface MenuRadioItemGroupBaseProps
  extends OptionalUseMenuItemGroupContext,
    PolymorphicProps<'div'> {}
export interface MenuRadioItemGroupProps extends HTMLProps<'div'>, MenuRadioItemGroupBaseProps {}

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
