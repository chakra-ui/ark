import type { OptionItemProps } from '@zag-js/menu'
import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { createSplitProps } from '../../utils/create-split-props'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useMenuContext } from './use-menu-context'
import { MenuItemProvider } from './use-menu-item-context'
import { MenuItemPropsProvider } from './use-menu-option-item-props-context'

type PartialOptionItemProps = Omit<OptionItemProps, 'type'>

export interface MenuCheckboxItemBaseProps extends PartialOptionItemProps, PolymorphicProps {}
export interface MenuCheckboxItemProps extends HTMLProps<'div'>, MenuCheckboxItemBaseProps {}

const splitOptionItemProps = createSplitProps<PartialOptionItemProps>()

export const MenuCheckboxItem = forwardRef<HTMLDivElement, MenuCheckboxItemProps>((props, ref) => {
  const [partialOptionItemProps, localProps] = splitOptionItemProps(props, [
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
  const mergedProps = mergeProps(menu?.getOptionItemProps(optionItemProps), localProps)
  const optionItemState = menu?.getOptionItemState(optionItemProps)

  return (
    <MenuItemPropsProvider value={optionItemProps}>
      <MenuItemProvider value={optionItemState!}>
        <ark.div {...mergedProps} ref={ref} />
      </MenuItemProvider>
    </MenuItemPropsProvider>
  )
})

MenuCheckboxItem.displayName = 'MenuCheckboxItem'
