'use client'

import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.ts'
import { useMenuContext } from './use-menu-context.ts'

export interface MenuInputBaseProps extends PolymorphicProps {}
export interface MenuInputProps extends HTMLProps<'input'>, MenuInputBaseProps {}

export const MenuInput = forwardRef<HTMLInputElement, MenuInputProps>((props, ref) => {
  const menu = useMenuContext()
  const mergedProps = mergeProps(menu.getInputProps(), props)

  return <ark.input {...mergedProps} ref={ref} />
})

MenuInput.displayName = 'MenuInput'
