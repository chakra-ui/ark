import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLArkProps, ark } from '../factory'
import { useMenuContext } from './use-menu-context'
import { useMenuOptionItemPropsContext } from './use-menu-option-item-props-context'

export interface MenuItemTextProps extends HTMLArkProps<'div'> {}

export const MenuItemText = forwardRef<HTMLDivElement, MenuItemTextProps>((props, ref) => {
  const menu = useMenuContext()
  const optionItemProps = useMenuOptionItemPropsContext()
  const mergedProps = mergeProps(menu.getItemTextProps(optionItemProps), props)

  return <ark.div {...mergedProps} ref={ref} />
})

MenuItemText.displayName = 'MenuItemText'
