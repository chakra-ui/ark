import type { OptionItemProps } from '@zag-js/menu'
import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { createSplitProps } from '../create-split-props'
import { ark, type HTMLArkProps } from '../factory'
import { type Assign } from '../types'
import { useMenuContext } from './use-menu-context'
import { MenuItemProvider } from './use-menu-item-context'
import { useMenuItemGroupContext } from './use-menu-item-group-context'
import { MenuOptionItemPropsProvider } from './use-menu-option-item-context'

type PartialOptionItemProps = Omit<OptionItemProps, 'type' | 'checked' | 'onCheckedChange'>

export interface MenuRadioItemProps extends Assign<HTMLArkProps<'div'>, PartialOptionItemProps> {}

export const MenuRadioItem = forwardRef<HTMLDivElement, MenuRadioItemProps>((props, ref) => {
  const [partialItemProps, localProps] = createSplitProps<PartialOptionItemProps>()(props, [
    'closeOnSelect',
    'disabled',
    'value',
    'valueText',
  ])
  const context = useMenuContext()
  const itemGroupContext = useMenuItemGroupContext()
  const optionItemProps: OptionItemProps = {
    ...partialItemProps,
    checked: itemGroupContext.value === partialItemProps.value,
    type: 'radio',
    onCheckedChange: () => itemGroupContext.onValueChange?.({ value: partialItemProps.value }),
  }
  const mergedProps = mergeProps(context.getOptionItemProps(optionItemProps), localProps)
  const itemState = context.getItemState(optionItemProps)

  return (
    <MenuOptionItemPropsProvider value={optionItemProps}>
      <MenuItemProvider value={itemState}>
        <ark.div {...mergedProps} ref={ref} />
      </MenuItemProvider>
    </MenuOptionItemPropsProvider>
  )
})

MenuRadioItem.displayName = 'MenuRadioItem'
