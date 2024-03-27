import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import { useMenuContext } from './menu-context'
import { type UseMenuReturn } from './use-menu'
import { useMenuOptionItemPropsContext } from './use-menu-option-item-context'

export interface MenuOptionItemTextProps extends HTMLArkProps<'div'> {}

export const MenuOptionItemText = forwardRef<HTMLDivElement, MenuOptionItemTextProps>(
  (props, ref) => {
    const api = useMenuContext() as UseMenuReturn['api']
    const optionItemProps = useMenuOptionItemPropsContext()
    const mergedProps = mergeProps(api?.getOptionItemTextProps(optionItemProps) ?? {}, props)

    return <ark.div {...mergedProps} ref={ref} />
  },
)

MenuOptionItemText.displayName = 'MenuOptionItemText'
