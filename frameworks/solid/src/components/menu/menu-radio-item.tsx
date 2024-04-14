import type { OptionItemProps } from '@zag-js/menu'
import { mergeProps } from '@zag-js/solid'
import { createMemo } from 'solid-js'
import { type HTMLArkProps, ark } from '../../factory'
import type { Assign } from '../../types'
import { createSplitProps } from '../../utils/create-split-props'
import { useMenuContext } from './use-menu-context'
import { MenuItemProvider } from './use-menu-item-context'
import { useMenuItemGroupContext } from './use-menu-item-group-context'
import { MenuOptionItemPropsProvider } from './use-menu-option-item-context'

type PartialOptionItemProps = Omit<OptionItemProps, 'type' | 'checked' | 'onCheckedChange'>

export interface MenuRadioItemProps extends Assign<HTMLArkProps<'div'>, PartialOptionItemProps> {}

export const MenuRadioItem = (props: MenuRadioItemProps) => {
  const [partialItemProps, localProps] = createSplitProps<PartialOptionItemProps>()(props, [
    'closeOnSelect',
    'disabled',
    'value',
    'valueText',
  ])
  const context = useMenuContext()
  const itemGroup = useMenuItemGroupContext()
  const optionItemProps = mergeProps(partialItemProps, () => ({
    type: 'radio',
    checked: itemGroup.value === partialItemProps.value,
    onCheckedChange: () => itemGroup.onValueChange?.({ value: partialItemProps.value }),
  })) as OptionItemProps

  const mergedProps = mergeProps(() => context().getOptionItemProps(optionItemProps), localProps)
  const itemState = createMemo(() => context().getItemState(optionItemProps))

  return (
    <MenuOptionItemPropsProvider value={optionItemProps}>
      <MenuItemProvider value={itemState}>
        <ark.div {...mergedProps} />
      </MenuItemProvider>
    </MenuOptionItemPropsProvider>
  )
}
