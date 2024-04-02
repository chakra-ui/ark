import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import { useMenuContext } from './use-menu-context'

export interface MenuContextTriggerProps extends HTMLArkProps<'button'> {}

export const MenuContextTrigger = forwardRef<HTMLButtonElement, MenuContextTriggerProps>(
  (props, ref) => {
    const context = useMenuContext()
    const mergedProps = mergeProps(context.contextTriggerProps, props)

    return <ark.button {...mergedProps} ref={ref} />
  },
)

MenuContextTrigger.displayName = 'MenuContextTrigger'
