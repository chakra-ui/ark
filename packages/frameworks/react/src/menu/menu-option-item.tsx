import type { OptionItemProps } from '@zag-js/menu'
import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { createSplitProps } from '../create-split-props'
import { ark, type HTMLArkProps } from '../factory'
import { type Assign } from '../types'
import { useMenuContext } from './menu-context'
import { type UseMenuReturn } from './use-menu'
import { MenuOptionItemPropsProvider } from './use-menu-option-item-context'

export interface MenuOptionItemProps extends Assign<HTMLArkProps<'div'>, OptionItemProps> {}

export const MenuOptionItem = forwardRef<HTMLDivElement, MenuOptionItemProps>((props, ref) => {
  const api = useMenuContext() as UseMenuReturn['api']
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
  const mergedProps = mergeProps(api?.getOptionItemProps(optionItemProps) ?? {}, localProps)

  return (
    <MenuOptionItemPropsProvider value={optionItemProps}>
      <ark.div {...mergedProps} ref={ref} />
    </MenuOptionItemPropsProvider>
  )
})

MenuOptionItem.displayName = 'MenuOptionItem'
