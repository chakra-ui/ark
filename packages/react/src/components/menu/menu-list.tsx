'use client'

import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.ts'
import { useMenuContext } from './use-menu-context.ts'

export interface MenuListBaseProps extends PolymorphicProps {}
export interface MenuListProps extends HTMLProps<'div'>, MenuListBaseProps {}

export const MenuList = forwardRef<HTMLDivElement, MenuListProps>((props, ref) => {
  const menu = useMenuContext()
  const mergedProps = mergeProps(menu.getListProps(), props)

  return <ark.div {...mergedProps} ref={ref} />
})

MenuList.displayName = 'MenuList'
