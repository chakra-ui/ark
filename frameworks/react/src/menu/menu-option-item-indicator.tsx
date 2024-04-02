import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import { useMenuContext } from './use-menu-context'
import { useMenuOptionItemPropsContext } from './use-menu-option-item-context'

export interface MenuOptionItemIndicatorProps extends HTMLArkProps<'div'> {}

export const MenuOptionItemIndicator = forwardRef<HTMLDivElement, MenuOptionItemIndicatorProps>(
  (props, ref) => {
    const context = useMenuContext()
    const optionItemProps = useMenuOptionItemPropsContext()
    const mergedProps = mergeProps(context.getOptionItemIndicatorProps(optionItemProps), props)

    return <ark.div {...mergedProps} ref={ref} />
  },
)

MenuOptionItemIndicator.displayName = 'MenuOptionItemIndicator'
