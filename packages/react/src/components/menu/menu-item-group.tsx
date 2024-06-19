import type { ItemGroupProps } from '@zag-js/menu'
import { mergeProps } from '@zag-js/react'
import { forwardRef, useId } from 'react'
import type { Optional } from '../../types'
import { createSplitProps } from '../../utils/create-split-props'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useMenuContext } from './use-menu-context'
import { MenuItemGroupProvider } from './use-menu-item-group-context'

type OptionalItemGroupProps = Optional<ItemGroupProps, 'id'>

export interface MenuItemGroupBaseProps extends OptionalItemGroupProps, PolymorphicProps {}
export interface MenuItemGroupProps extends HTMLProps<'div'>, MenuItemGroupBaseProps {}

export const MenuItemGroup = forwardRef<HTMLDivElement, MenuItemGroupProps>((props, ref) => {
  const [optionalItemGroupProps, localProps] = createSplitProps<OptionalItemGroupProps>()(props, [
    'id',
  ])
  const menu = useMenuContext()
  const id = useId()
  const itemGroupProps = { id, ...optionalItemGroupProps }
  const mergedProps = mergeProps(menu.getItemGroupProps(itemGroupProps), localProps)

  return (
    <MenuItemGroupProvider value={itemGroupProps}>
      <ark.div {...mergedProps} ref={ref} />
    </MenuItemGroupProvider>
  )
})

MenuItemGroup.displayName = 'MenuItemGroup'
