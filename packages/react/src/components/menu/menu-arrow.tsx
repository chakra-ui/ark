import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useMenuContext } from './use-menu-context'

export interface MenuArrowBaseProps extends PolymorphicProps {}
export interface MenuArrowProps extends HTMLProps<'div'>, MenuArrowBaseProps {}

export const MenuArrow = forwardRef<HTMLDivElement, MenuArrowProps>((props, ref) => {
  const menu = useMenuContext()
  const mergedProps = mergeProps(menu.getArrowProps(), props)

  return <ark.div {...mergedProps} ref={ref} />
})

MenuArrow.displayName = 'MenuArrow'
