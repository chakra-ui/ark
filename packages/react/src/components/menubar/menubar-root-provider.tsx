'use client'

import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { createSplitProps } from '../../utils/create-split-props.ts'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.ts'
import type { UseMenubarReturn } from './use-menubar.ts'
import { MenubarProvider } from './use-menubar-context.ts'

interface RootProviderProps {
  value: UseMenubarReturn
}

export interface MenubarRootProviderBaseProps extends RootProviderProps, PolymorphicProps {}
export interface MenubarRootProviderProps extends HTMLProps<'div'>, MenubarRootProviderBaseProps {}

const splitRootProviderProps = createSplitProps<RootProviderProps>()

export const MenubarRootProvider = forwardRef<HTMLDivElement, MenubarRootProviderProps>((props, ref) => {
  const [{ value: menubar }, localProps] = splitRootProviderProps(props, ['value'])
  const mergedProps = mergeProps(menubar.getRootProps(), localProps)

  return (
    <MenubarProvider value={menubar}>
      <ark.div {...mergedProps} ref={ref} />
    </MenubarProvider>
  )
})

MenubarRootProvider.displayName = 'MenubarRootProvider'
