import type { OptionItemProps } from '@zag-js/menu'
import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { createSplitProps } from '../create-split-props'
import { ark, type HTMLArkProps } from '../factory'
import { type Assign } from '../types'
import { useMenuContext } from './use-menu-context'
import { MenuItemProvider } from './use-menu-item-context'
import { MenuOptionItemPropsProvider } from './use-menu-option-item-context'

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
  const context = useMenuContext()
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

MenuCheckboxItem.displayName = 'MenuCheckboxItem'
