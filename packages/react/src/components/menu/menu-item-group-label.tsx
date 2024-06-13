import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLArkProps, ark } from '../factory'
import { useMenuContext } from './use-menu-context'
import { useMenuItemGroupContext } from './use-menu-item-group-context'

export type MenuItemGroupLabelBaseProps = {}
export interface MenuItemGroupLabelProps extends HTMLArkProps<'div'>, MenuItemGroupLabelBaseProps {}

export const MenuItemGroupLabel = forwardRef<HTMLDivElement, MenuItemGroupLabelProps>(
  (props, ref) => {
    const menu = useMenuContext()
    const itemGroup = useMenuItemGroupContext()
    const mergedProps = mergeProps(menu.getItemGroupLabelProps({ htmlFor: itemGroup.id }), props)

    return <ark.div {...mergedProps} ref={ref} />
  },
)

MenuItemGroupLabel.displayName = 'MenuItemGroupLabel'
