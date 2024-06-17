import type { ItemProps } from '@zag-js/menu'
import { mergeProps } from '@zag-js/solid'
import { type JSX, createMemo } from 'solid-js'
import { createSplitProps } from '../../utils/create-split-props'
import { type PolymorphicProps, ark } from '../factory'
import { useMenuContext } from './use-menu-context'
import { MenuItemProvider } from './use-menu-item-context'

export interface MenuItemBaseProps extends ItemProps, PolymorphicProps<'div'> {}
export interface MenuItemProps extends JSX.HTMLAttributes<HTMLDivElement>, MenuItemBaseProps {}

export const MenuItem = (props: MenuItemProps) => {
  const [itemProps, localProps] = createSplitProps<ItemProps>()(props, [
    'closeOnSelect',
    'disabled',
    'value',
    'valueText',
  ])
  const context = useMenuContext()
  const mergedProps = mergeProps(() => context().getItemProps(itemProps), localProps)
  const itemState = createMemo(() => context().getItemState(itemProps))

  return (
    <MenuItemProvider value={itemState}>
      <ark.div {...mergedProps} />
    </MenuItemProvider>
  )
}
