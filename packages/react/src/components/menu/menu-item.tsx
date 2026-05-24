'use client'

import type { ItemProps } from '@zag-js/menu'
import { mergeProps } from '@zag-js/react'
import { forwardRef, useEffect } from 'react'
import type { Assign } from '../../types.ts'
import { createSplitProps } from '../../utils/create-split-props.ts'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.ts'
import { useMenuContext } from './use-menu-context.ts'
import { MenuItemProvider } from './use-menu-item-context.ts'
import { MenuItemPropsProvider } from './use-menu-option-item-props-context.ts'

interface ItemBaseProps extends ItemProps {
  /**
   * The function to call when the item is selected
   */
  onSelect?: VoidFunction | undefined
}

export interface MenuItemBaseProps extends ItemBaseProps, PolymorphicProps {}

export interface MenuItemProps extends Assign<HTMLProps<'div'>, MenuItemBaseProps> {}

const splitItemBaseProps = createSplitProps<ItemBaseProps>()

export const MenuItem = forwardRef<HTMLDivElement, MenuItemProps>((props, ref) => {
  const [itemProps, localProps] = splitItemBaseProps(props, [
    'closeOnSelect',
    'disabled',
    'value',
    'valueText',
    'onSelect',
  ])

  const menu = useMenuContext()
  const mergedProps = mergeProps(menu.getItemProps(itemProps), localProps)
  const itemState = menu.getItemState(itemProps)

  // biome-ignore lint/correctness/useExhaustiveDependencies: intentional
  useEffect(() => {
    return menu.addItemListener({ id: itemState.id, onSelect: itemProps.onSelect })
  }, [itemState.id, itemProps.onSelect])

  return (
    <MenuItemPropsProvider value={itemProps}>
      <MenuItemProvider value={itemState}>
        <ark.div {...mergedProps} ref={ref} />
      </MenuItemProvider>
    </MenuItemPropsProvider>
  )
})

MenuItem.displayName = 'MenuItem'
