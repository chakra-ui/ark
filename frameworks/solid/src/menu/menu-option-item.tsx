import type { OptionItemProps } from '@zag-js/menu'
import { mergeProps } from '@zag-js/solid'
import { createSplitProps } from '../create-split-props'
import { ark, type HTMLArkProps } from '../factory'
import type { Assign } from '../types'
import { useMenuContext } from './use-menu-context'
import { MenuOptionItemPropsProvider } from './use-menu-option-item-context'

export interface MenuOptionItemProps extends Assign<HTMLArkProps<'div'>, OptionItemProps> {}

export const MenuOptionItem = (props: MenuOptionItemProps) => {
  const menu = useMenuContext()
  const [optionItemProps, localProps] = createSplitProps<OptionItemProps>()(props, [
    'id',
    'disabled',
    'valueText',
    'closeOnSelect',
    'name',
    'type',
    'value',
    'onCheckedChange',
  ])
  const mergedProps = mergeProps(() => menu().getOptionItemProps(optionItemProps), localProps)

  return (
    <MenuOptionItemPropsProvider value={optionItemProps}>
      <ark.div {...mergedProps} />
    </MenuOptionItemPropsProvider>
  )
}
