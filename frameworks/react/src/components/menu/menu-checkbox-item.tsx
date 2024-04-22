import type { OptionItemProps } from '@zag-js/menu'
import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import type { Assign } from '../../types'
import { createSplitProps } from '../../utils/create-split-props'
import { type HTMLArkProps, ark } from '../factory'
import { useMenuContext } from './use-menu-context'
import { MenuItemProvider } from './use-menu-item-context'
import { MenuOptionItemPropsProvider } from './use-menu-option-item-props-context'

type PartialOptionItemProps = Omit<OptionItemProps, 'type'>

export interface MenuCheckboxItemProps
  extends Assign<HTMLArkProps<'div'>, PartialOptionItemProps> {}

export const MenuCheckboxItem = forwardRef<HTMLDivElement, MenuCheckboxItemProps>((props, ref) => {
  const [partialOptionItemProps, localProps] = createSplitProps<PartialOptionItemProps>()(props, [
    'checked',
    'closeOnSelect',
    'disabled',
    'onCheckedChange',
    'value',
    'valueText',
  ])
  const optionItemProps: OptionItemProps = {
    ...partialOptionItemProps,
    type: 'checkbox',
  }
  const menu = useMenuContext()
  const item = menu.getOptionItemState(optionItemProps)
  const mergedProps = mergeProps(menu.getOptionItemProps(optionItemProps), localProps)

  return (
    <MenuOptionItemPropsProvider value={optionItemProps}>
      <MenuItemProvider value={item}>
        <ark.div {...mergedProps} ref={ref} />
      </MenuItemProvider>
    </MenuOptionItemPropsProvider>
  )
})

MenuCheckboxItem.displayName = 'MenuCheckboxItem'
