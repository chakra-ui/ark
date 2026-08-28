import type { OptionItemProps } from '@zag-js/menu'
import { mergeProps } from '@zag-js/solid'
import { createMemo } from 'solid-js'
import { createSplitProps } from '../../utils/create-split-props.ts'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.tsx'
import { useMenuContext } from './use-menu-context.ts'
import { MenuItemProvider } from './use-menu-item-context.ts'
import { useMenuItemGroupContext } from './use-menu-item-group-context.ts'
import { MenuItemPropsProvider } from './use-menu-option-item-props-context.ts'

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
    <MenuItemPropsProvider value={optionItemProps}>
      <MenuItemProvider value={optionItemState}>
        <ark.div {...mergedProps} />
      </MenuItemProvider>
    </MenuItemPropsProvider>
  )
}
