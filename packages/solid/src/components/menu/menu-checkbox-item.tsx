import type { OptionItemProps } from '@zag-js/menu'
import { mergeProps } from '@zag-js/solid'
import { createMemo } from 'solid-js'
import { createSplitProps } from '../../utils/create-split-props'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useMenuContext } from './use-menu-context'
import { MenuItemProvider } from './use-menu-item-context'
import { MenuOptionItemPropsProvider } from './use-menu-option-item-props-context'

type PartialOptionItemProps = Omit<OptionItemProps, 'type'>

export interface MenuCheckboxItemBaseProps
  extends PartialOptionItemProps,
    PolymorphicProps<'div'> {}
export interface MenuCheckboxItemProps extends HTMLProps<'div'>, MenuCheckboxItemBaseProps {}

export const MenuCheckboxItem = (props: MenuCheckboxItemProps) => {
  const [partialOptionItemProps, localProps] = createSplitProps<PartialOptionItemProps>()(props, [
    'checked',
    'closeOnSelect',
    'disabled',
    'onCheckedChange',
    'value',
    'valueText',
  ])
  const optionItemProps = mergeProps(partialOptionItemProps, {
    type: 'checkbox',
  }) as OptionItemProps

  const context = useMenuContext()
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
