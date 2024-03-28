import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { createSplitProps } from '../create-split-props'
import { ark, type HTMLArkProps } from '../factory'
import { type Assign } from '../types'
import { useMenuContext } from './menu-context'
import { type UseMenuReturn } from './use-menu'

interface ItemGroupLabelProps {
  htmlFor: string
}

export interface MenuItemGroupLabelProps extends Assign<HTMLArkProps<'div'>, ItemGroupLabelProps> {}

export const MenuItemGroupLabel = forwardRef<HTMLDivElement, MenuItemGroupLabelProps>(
  (props, ref) => {
    const [labelProps, htmlProps] = createSplitProps<ItemGroupLabelProps>()(props, ['htmlFor'])

    const api = useMenuContext() as UseMenuReturn['api']
    const mergedProps = mergeProps(api?.getItemGroupLabelProps(labelProps) ?? {}, htmlProps)

    return <ark.div {...mergedProps} ref={ref} />
  },
)

MenuItemGroupLabel.displayName = 'MenuItemGroupLabel'
