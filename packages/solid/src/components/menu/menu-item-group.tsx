import type { ItemGroupProps } from '@zag-js/menu'
import { mergeProps } from '@zag-js/solid'
import type { JSX } from 'solid-js'
import { createUniqueId } from 'solid-js'
import type { Optional } from '../../types'
import { createSplitProps } from '../../utils/create-split-props'
import { type PolymorphicProps, ark } from '../factory'
import { useMenuContext } from './use-menu-context'
import { MenuItemGroupProvider } from './use-menu-item-group-context'

type OptionalItemGroupProps = Optional<ItemGroupProps, 'id'>

export interface MenuItemGroupBaseProps extends OptionalItemGroupProps, PolymorphicProps<'div'> {}
export interface MenuItemGroupProps
  extends JSX.HTMLAttributes<HTMLDivElement>,
    MenuItemGroupBaseProps {}

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
