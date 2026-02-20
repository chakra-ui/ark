import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useDrawerStackContext } from './use-drawer-stack-context'

export interface DrawerIndentBackgroundBaseProps extends PolymorphicProps {}
export interface DrawerIndentBackgroundProps extends HTMLProps<'div'>, DrawerIndentBackgroundBaseProps {}

export const DrawerIndentBackground = forwardRef<HTMLDivElement, DrawerIndentBackgroundProps>((props, ref) => {
  const stackApi = useDrawerStackContext()
  const mergedProps = mergeProps(stackApi.getIndentBackgroundProps(), props)

  return <ark.div {...mergedProps} ref={ref} />
})

DrawerIndentBackground.displayName = 'DrawerIndentBackground'
