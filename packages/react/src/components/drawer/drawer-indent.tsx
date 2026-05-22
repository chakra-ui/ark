'use client'

import { mergeProps } from '@zag-js/react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useDrawerStackContext } from './use-drawer-stack-context'

export interface DrawerIndentBaseProps extends PolymorphicProps {}
export interface DrawerIndentProps extends HTMLProps<'div'>, DrawerIndentBaseProps {}

export const DrawerIndent = ({ ref, ...props }: DrawerIndentProps) => {
  const stackApi = useDrawerStackContext()
  const mergedProps = mergeProps(stackApi.getIndentProps(), props)

  return <ark.div {...mergedProps} ref={ref} />
}

DrawerIndent.displayName = 'DrawerIndent'
