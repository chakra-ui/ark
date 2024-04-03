import type { OptionItemProps } from '@zag-js/menu'
import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { createSplitProps } from '../create-split-props'
import { ark, type HTMLArkProps } from '../factory'
import { type Assign } from '../types'
import { useMenuContext } from './use-menu-context'
import { MenuOptionItemPropsProvider } from './use-menu-option-item-context'

export interface MenuCheckboxItemProps extends Assign<HTMLArkProps<'div'>, OptionItemProps> {}

export const MenuCheckboxItem = forwardRef<HTMLDivElement, MenuCheckboxItemProps>((props, ref) => {
  const context = useMenuContext()
  const [optionItemProps, localProps] = createSplitProps<OptionItemProps>()(props, [
    'checked',
    'closeOnSelect',
    'disabled',
    'onCheckedChange',
    'type',
    'value',
    'valueText',
  ])
  const mergedProps = mergeProps(context.getOptionItemProps(optionItemProps), localProps)

  return (
    <MenuOptionItemPropsProvider value={optionItemProps}>
      <ark.div {...mergedProps} ref={ref} />
    </MenuOptionItemPropsProvider>
  )
})

MenuCheckboxItem.displayName = 'MenuCheckboxItem'
