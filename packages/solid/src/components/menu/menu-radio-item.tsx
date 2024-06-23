import type { OptionItemProps } from '@zag-js/menu'
import { mergeProps } from '@zag-js/solid'
import { createMemo } from 'solid-js'
import { createSplitProps } from '../../utils/create-split-props'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useMenuContext } from './use-menu-context'
import { MenuItemProvider } from './use-menu-item-context'
import { useMenuItemGroupContext } from './use-menu-item-group-context'
import { MenuOptionItemPropsProvider } from './use-menu-option-item-props-context'

type PartialOptionItemProps = Omit<OptionItemProps, 'type' | 'checked' | 'onCheckedChange'>

export interface MenuRadioItemBaseProps extends PartialOptionItemProps, PolymorphicProps<'div'> {}
export interface MenuRadioItemProps extends HTMLProps<'div'>, MenuRadioItemBaseProps {}

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
  const optionItemState = createMemo(() => context().getOptionItemState(optionItemProps))

  return (
    <MenuOptionItemPropsProvider value={optionItemProps}>
      <MenuItemProvider value={optionItemState}>
        <ark.div {...mergedProps} />
      </MenuItemProvider>
    </MenuOptionItemPropsProvider>
  )
}
