import { mergeProps } from '@zag-js/react'
import { type HTMLAttributes, forwardRef } from 'react'
import { type PolymorphicProps, ark } from '../factory'
import { useMenuContext } from './use-menu-context'

export interface MenuIndicatorBaseProps extends PolymorphicProps {}
export interface MenuIndicatorProps
  extends HTMLAttributes<HTMLDivElement>,
    MenuIndicatorBaseProps {}

export const MenuIndicator = forwardRef<HTMLDivElement, MenuIndicatorProps>((props, ref) => {
  const menu = useMenuContext()
  const mergedProps = mergeProps(menu.getIndicatorProps(), props)

  return <ark.div {...mergedProps} ref={ref} />
})

MenuIndicator.displayName = 'MenuIndicator'
