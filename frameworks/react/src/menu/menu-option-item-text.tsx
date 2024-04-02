import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import { useMenuContext } from './use-menu-context'
import { useMenuOptionItemPropsContext } from './use-menu-option-item-context'

export interface MenuOptionItemTextProps extends HTMLArkProps<'div'> {}

export const MenuOptionItemText = forwardRef<HTMLDivElement, MenuOptionItemTextProps>(
  (props, ref) => {
    const context = useMenuContext()
    const optionItemProps = useMenuOptionItemPropsContext()
    const mergedProps = mergeProps(context.getOptionItemTextProps(optionItemProps), props)

    return <ark.div {...mergedProps} ref={ref} />
  },
)

MenuOptionItemText.displayName = 'MenuOptionItemText'
