import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import { useMenuContext } from './menu-context'
import { type UseMenuReturn } from './use-menu'
import { useMenuOptionItemPropsContext } from './use-menu-option-item-context'

export interface MenuOptionItemIndicatorProps extends HTMLArkProps<'div'> {}

export const MenuOptionItemIndicator = forwardRef<HTMLDivElement, MenuOptionItemIndicatorProps>(
  (props, ref) => {
    const api = useMenuContext() as UseMenuReturn['api']
    const optionItemProps = useMenuOptionItemPropsContext()
    const mergedProps = mergeProps(api?.getOptionItemIndicatorProps(optionItemProps) ?? {}, props)

    return <ark.div {...mergedProps} ref={ref} />
  },
)

MenuOptionItemIndicator.displayName = 'MenuOptionItemIndicator'
