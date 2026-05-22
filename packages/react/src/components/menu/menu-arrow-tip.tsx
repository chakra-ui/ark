'use client'

import { mergeProps } from '@zag-js/react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useMenuContext } from './use-menu-context'

export interface MenuArrowTipBaseProps extends PolymorphicProps {}
export interface MenuArrowTipProps extends HTMLProps<'div'>, MenuArrowTipBaseProps {}

export const MenuArrowTip = ({ ref, ...props }: MenuArrowTipProps) => {
  const menu = useMenuContext()
  const mergedProps = mergeProps(menu.getArrowTipProps(), props)

  return <ark.div {...mergedProps} ref={ref} />
}

MenuArrowTip.displayName = 'MenuArrowTip'
