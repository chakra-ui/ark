import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLArkProps, ark } from '../factory'
import { useMenuContext } from './use-menu-context'

export type MenuArrowTipBaseProps = {}
export interface MenuArrowTipProps extends HTMLArkProps<'div'>, MenuArrowTipBaseProps {}

export const MenuArrowTip = forwardRef<HTMLDivElement, MenuArrowTipProps>((props, ref) => {
  const menu = useMenuContext()
  const mergedProps = mergeProps(menu.getArrowTipProps(), props)

  return <ark.div {...mergedProps} ref={ref} />
})

MenuArrowTip.displayName = 'MenuArrowTip'
