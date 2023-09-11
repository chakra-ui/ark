import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HtmlArkProps } from '../factory'
import { useMenuContext } from './menu-context'
import { type UseMenuReturn } from './use-menu'

export type MenuContextTriggerProps = HtmlArkProps<'button'>

export const MenuContextTrigger = forwardRef<HTMLButtonElement, MenuContextTriggerProps>(
  (props, ref) => {
    const api = useMenuContext() as UseMenuReturn['api']
    const mergedProps = mergeProps(api?.contextTriggerProps ?? {}, props)

    return <ark.button {...mergedProps} ref={ref} />
  },
)

MenuContextTrigger.displayName = 'MenuContextTrigger'
