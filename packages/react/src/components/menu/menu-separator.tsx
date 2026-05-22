'use client'

import { mergeProps } from '@zag-js/react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useMenuContext } from './use-menu-context'

export interface MenuSeparatorBaseProps extends PolymorphicProps {}
export interface MenuSeparatorProps extends HTMLProps<'hr'>, MenuSeparatorBaseProps {}

export const MenuSeparator = ({ ref, ...props }: MenuSeparatorProps) => {
  const menu = useMenuContext()
  const mergedProps = mergeProps(menu.getSeparatorProps(), props)

  return <ark.hr {...mergedProps} ref={ref} />
}

MenuSeparator.displayName = 'MenuSeparator'
