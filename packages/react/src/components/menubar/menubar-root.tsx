'use client'

import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { createSplitProps } from '../../utils/create-split-props.ts'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.ts'
import { type UseMenubarProps, useMenubar } from './use-menubar.ts'
import { MenubarProvider } from './use-menubar-context.ts'

export interface MenubarRootBaseProps extends UseMenubarProps, PolymorphicProps {}
export interface MenubarRootProps extends HTMLProps<'div'>, MenubarRootBaseProps {}

const splitRootProps = createSplitProps<UseMenubarProps>()

export const MenubarRoot = forwardRef<HTMLDivElement, MenubarRootProps>((props, ref) => {
  const [useMenubarProps, localProps] = splitRootProps(props, ['disabled', 'id', 'ids', 'loopFocus', 'orientation'])
  const menubar = useMenubar(useMenubarProps)
  const mergedProps = mergeProps(menubar.getRootProps(), localProps)

  return (
    <MenubarProvider value={menubar}>
      <ark.div {...mergedProps} ref={ref} />
    </MenubarProvider>
  )
})

MenubarRoot.displayName = 'MenubarRoot'
