import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import { useMenuContext } from './use-menu-context'
import { useMenuItemGroupContext } from './use-menu-item-group-context'

export interface MenuItemGroupLabelProps extends HTMLArkProps<'div'> {}

export const MenuItemGroupLabel = forwardRef<HTMLDivElement, MenuItemGroupLabelProps>(
  (props, ref) => {
    const context = useMenuContext()
    const itemGroupContext = useMenuItemGroupContext()
    const mergedProps = mergeProps(
      context.getItemGroupLabelProps({ htmlFor: itemGroupContext.id }),
      props,
    )

    return <ark.div {...mergedProps} ref={ref} />
  },
)

MenuItemGroupLabel.displayName = 'MenuItemGroupLabel'
