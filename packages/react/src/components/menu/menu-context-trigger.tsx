'use client'

import { mergeProps } from '@zag-js/react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useMenuContext } from './use-menu-context'

export interface MenuContextTriggerBaseProps extends PolymorphicProps {}
export interface MenuContextTriggerProps extends HTMLProps<'button'>, MenuContextTriggerBaseProps {}

export const MenuContextTrigger = ({ ref, ...props }: MenuContextTriggerProps) => {
  const menu = useMenuContext()
  const mergedProps = mergeProps(menu.getContextTriggerProps(), props)

  return <ark.button {...mergedProps} ref={ref} />
}

MenuContextTrigger.displayName = 'MenuContextTrigger'
