import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useDrawerStackContext } from './use-drawer-stack-context'

export interface DrawerIndentBaseProps extends PolymorphicProps {}
export interface DrawerIndentProps extends HTMLProps<'div'>, DrawerIndentBaseProps {}

export const DrawerIndent = forwardRef<HTMLDivElement, DrawerIndentProps>((props, ref) => {
  const stackApi = useDrawerStackContext()
  const mergedProps = mergeProps(stackApi.getIndentProps(), props)

  return <ark.div {...mergedProps} ref={ref} />
})

DrawerIndent.displayName = 'DrawerIndent'
