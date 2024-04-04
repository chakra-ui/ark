import type { ItemGroupProps } from '@zag-js/menu'
import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { createSplitProps } from '../create-split-props'
import { ark, type HTMLArkProps } from '../factory'
import { type Assign } from '../types'
import { useMenuContext } from './use-menu-context'

// interface FooDetails {
//   value: string
// }

// interface Foo {
//   value?: string
//   onValueChange: (e: FooDetails) => void
// }

export interface MenuRadioItemGroupProps extends Assign<HTMLArkProps<'div'>, ItemGroupProps> {}

export const MenuRadioItemGroup = forwardRef<HTMLDivElement, MenuRadioItemGroupProps>(
  (props, ref) => {
    const [itemGroupProps, localProps] = createSplitProps<ItemGroupProps>()(props, ['id'])
    const context = useMenuContext()
    const mergedProps = mergeProps(context.getItemGroupProps(itemGroupProps), localProps)

    return <ark.div {...mergedProps} ref={ref} />
  },
)

MenuRadioItemGroup.displayName = 'MenuRadioItemGroup'
