import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { createSplitProps } from '../create-split-props'
import { ark, type HTMLArkProps } from '../factory'
import { type Assign } from '../types'
import { useMenuContext } from './menu-context'
import { type UseMenuReturn } from './use-menu'

type MenuItemGroupLabelParams = { htmlFor: string }
export type MenuItemGroupLabelProps = Assign<HTMLArkProps<'label'>, MenuItemGroupLabelParams>

export const MenuItemGroupLabel = forwardRef<HTMLLabelElement, MenuItemGroupLabelProps>(
  (props, ref) => {
    const api = useMenuContext() as UseMenuReturn['api']
    const [labelProps, htmlProps] = createSplitProps<MenuItemGroupLabelParams>()(props, ['htmlFor'])
    const mergedProps = mergeProps(api?.getItemGroupLabelProps(labelProps) ?? {}, htmlProps)

    return <ark.label {...mergedProps} ref={ref} />
  },
)

MenuItemGroupLabel.displayName = 'MenuItemGroupLabel'
