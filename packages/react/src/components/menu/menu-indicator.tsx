'use client'

import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.ts'
import { useMenuContext } from './use-menu-context.ts'

export interface MenuIndicatorBaseProps extends PolymorphicProps {}
export interface MenuIndicatorProps extends HTMLProps<'span'>, MenuIndicatorBaseProps {}

export const MenuIndicator = forwardRef<HTMLSpanElement, MenuIndicatorProps>((props, ref) => {
  const menu = useMenuContext()
  const mergedProps = mergeProps(menu.getIndicatorProps(), props)

  return <ark.span {...mergedProps} ref={ref} />
})

MenuIndicator.displayName = 'MenuIndicator'
