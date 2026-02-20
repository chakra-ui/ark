import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useDrawerContext } from './use-drawer-context'

export interface DrawerTitleBaseProps extends PolymorphicProps {}
export interface DrawerTitleProps extends HTMLProps<'h2'>, DrawerTitleBaseProps {}

export const DrawerTitle = forwardRef<HTMLHeadingElement, DrawerTitleProps>((props, ref) => {
  const drawer = useDrawerContext()
  const mergedProps = mergeProps(drawer.getTitleProps(), props)

  return <ark.h2 {...mergedProps} ref={ref} />
})

DrawerTitle.displayName = 'DrawerTitle'
