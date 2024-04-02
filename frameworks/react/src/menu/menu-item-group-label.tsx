import type { ItemGroupLabelProps } from '@zag-js/menu'
import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { createSplitProps } from '../create-split-props'
import { ark, type HTMLArkProps } from '../factory'
import { type Assign } from '../types'
import { useMenuContext } from './use-menu-context'

export interface MenuItemGroupLabelProps extends Assign<HTMLArkProps<'div'>, ItemGroupLabelProps> {}

export const MenuItemGroupLabel = forwardRef<HTMLDivElement, MenuItemGroupLabelProps>(
  (props, ref) => {
    const [labelProps, localProps] = createSplitProps<ItemGroupLabelProps>()(props, ['htmlFor'])
    const context = useMenuContext()
    const mergedProps = mergeProps(context.getItemGroupLabelProps(labelProps), localProps)

    return <ark.div {...mergedProps} ref={ref} />
  },
)

MenuItemGroupLabel.displayName = 'MenuItemGroupLabel'
