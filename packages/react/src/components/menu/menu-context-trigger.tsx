import { mergeProps } from '@zag-js/react'
import { type ButtonHTMLAttributes, forwardRef } from 'react'
import { type PolymorphicProps, ark } from '../factory'
import { useMenuContext } from './use-menu-context'

export interface MenuContextTriggerBaseProps extends PolymorphicProps {}
export interface MenuContextTriggerProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    MenuContextTriggerBaseProps {}

export const MenuContextTrigger = forwardRef<HTMLButtonElement, MenuContextTriggerProps>(
  (props, ref) => {
    const menu = useMenuContext()
    const mergedProps = mergeProps(menu.getContextTriggerProps(), props)

    return <ark.button {...mergedProps} ref={ref} />
  },
)

MenuContextTrigger.displayName = 'MenuContextTrigger'
