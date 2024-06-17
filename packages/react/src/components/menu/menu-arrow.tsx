import { mergeProps } from '@zag-js/react'
import { type HTMLAttributes, forwardRef } from 'react'
import { type PolymorphicProps, ark } from '../factory'
import { useMenuContext } from './use-menu-context'

export interface MenuArrowBaseProps extends PolymorphicProps {}
export interface MenuArrowProps extends HTMLAttributes<HTMLDivElement>, MenuArrowBaseProps {}

export const MenuArrow = forwardRef<HTMLDivElement, MenuArrowProps>((props, ref) => {
  const menu = useMenuContext()
  const mergedProps = mergeProps(menu.getArrowProps(), props)

  return <ark.div {...mergedProps} ref={ref} />
})

MenuArrow.displayName = 'MenuArrow'
