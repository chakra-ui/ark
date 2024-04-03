import type { ItemGroupProps } from '@zag-js/menu'
import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { createSplitProps } from '../create-split-props'
import { ark, type HTMLArkProps } from '../factory'
import { type Assign } from '../types'
import { useMenuContext } from './use-menu-context'

export interface MenuCheckboxItemGroupProps extends Assign<HTMLArkProps<'div'>, ItemGroupProps> {}

export const MenuCheckboxItemGroup = forwardRef<HTMLDivElement, MenuCheckboxItemGroupProps>(
  (props, ref) => {
    const [itemGroupProps, localProps] = createSplitProps<ItemGroupProps>()(props, ['id'])
    const context = useMenuContext()
    const mergedProps = mergeProps(context.getItemGroupProps(itemGroupProps), localProps)

    return <ark.div {...mergedProps} ref={ref} />
  },
)

MenuCheckboxItemGroup.displayName = 'MenuCheckboxItemGroup'
