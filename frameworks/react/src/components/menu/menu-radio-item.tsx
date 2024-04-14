import type { OptionItemProps } from '@zag-js/menu'
import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import type { Assign } from '~/types'
import { createSplitProps } from '~/utils/create-split-props'
import { type HTMLArkProps, ark } from '../../factory'
import { useMenuContext } from './use-menu-context'
import { MenuItemProvider } from './use-menu-item-context'
import { useMenuItemGroupContext } from './use-menu-item-group-context'
import { MenuOptionItemPropsProvider } from './use-menu-option-item-props-context'

type PartialOptionItemProps = Omit<OptionItemProps, 'type' | 'checked' | 'onCheckedChange'>

export interface MenuRadioItemProps extends Assign<HTMLArkProps<'div'>, PartialOptionItemProps> {}

export const MenuRadioItem = forwardRef<HTMLDivElement, MenuRadioItemProps>((props, ref) => {
  const [partialItemProps, localProps] = createSplitProps<PartialOptionItemProps>()(props, [
    'closeOnSelect',
    'disabled',
    'value',
    'valueText',
  ])
  const menu = useMenuContext()
  const itemGroup = useMenuItemGroupContext()
  const optionItemProps: OptionItemProps = {
    ...partialItemProps,
    checked: itemGroup.value === partialItemProps.value,
    type: 'radio',
    onCheckedChange: () => itemGroup.onValueChange?.({ value: partialItemProps.value }),
  }
  const mergedProps = mergeProps(menu.getOptionItemProps(optionItemProps), localProps)
  const itemState = menu.getItemState(optionItemProps)

  return (
    <MenuOptionItemPropsProvider value={optionItemProps}>
      <MenuItemProvider value={itemState}>
        <ark.div {...mergedProps} ref={ref} />
      </MenuItemProvider>
    </MenuOptionItemPropsProvider>
  )
})

MenuRadioItem.displayName = 'MenuRadioItem'
