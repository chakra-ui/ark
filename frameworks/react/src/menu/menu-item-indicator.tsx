import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import { useMenuContext } from './use-menu-context'
import { useMenuOptionItemPropsContext } from './use-menu-option-item-context'

export interface MenuItemIndicatorProps extends HTMLArkProps<'div'> {}

export const MenuItemIndicator = forwardRef<HTMLDivElement, MenuItemIndicatorProps>(
  (props, ref) => {
    const context = useMenuContext()
    const optionItemProps = useMenuOptionItemPropsContext()
    const mergedProps = mergeProps(context.getItemIndicatorProps(optionItemProps), props)

    return <ark.div {...mergedProps} ref={ref} />
  },
)

MenuItemIndicator.displayName = 'MenuItemIndicator'
