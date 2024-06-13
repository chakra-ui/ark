import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLArkProps, ark } from '../factory'
import { useMenuContext } from './use-menu-context'

export type MenuIndicatorBaseProps = {}
export interface MenuIndicatorProps extends HTMLArkProps<'div'>, MenuIndicatorBaseProps {}

export const MenuIndicator = forwardRef<HTMLDivElement, MenuIndicatorProps>((props, ref) => {
  const menu = useMenuContext()
  const mergedProps = mergeProps(menu.getIndicatorProps(), props)

  return <ark.div {...mergedProps} ref={ref} />
})

MenuIndicator.displayName = 'MenuIndicator'
