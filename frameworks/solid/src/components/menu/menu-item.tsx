import type { ItemProps } from '@zag-js/menu'
import { mergeProps } from '@zag-js/solid'
import { createMemo } from 'solid-js'
import { type HTMLArkProps, ark } from '~/factory'
import type { Assign } from '~/types'
import { createSplitProps } from '~/utils/create-split-props'
import { useMenuContext } from './use-menu-context'
import { MenuItemProvider } from './use-menu-item-context'

export interface MenuItemProps extends Assign<HTMLArkProps<'div'>, ItemProps> {}

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
