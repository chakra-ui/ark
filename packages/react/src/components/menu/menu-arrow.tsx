'use client'

import { mergeProps } from '@zag-js/react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useMenuContext } from './use-menu-context'

export interface MenuArrowBaseProps extends PolymorphicProps {}
export interface MenuArrowProps extends HTMLProps<'div'>, MenuArrowBaseProps {}

export const MenuArrow = ({ ref, ...props }: MenuArrowProps) => {
  const menu = useMenuContext()
  const mergedProps = mergeProps(menu.getArrowProps(), props)

  return <ark.div {...mergedProps} ref={ref} />
}

MenuArrow.displayName = 'MenuArrow'
