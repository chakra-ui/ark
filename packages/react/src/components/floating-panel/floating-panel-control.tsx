import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useFloatingPanelContext } from './use-floating-panel-context'

export interface FloatingPanelControlBaseProps extends PolymorphicProps {}
export interface FloatingPanelControlProps extends HTMLProps<'div'>, FloatingPanelControlBaseProps {}

export const FloatingPanelControl = forwardRef<HTMLDivElement, FloatingPanelControlProps>((props, ref) => {
  const floatingPanel = useFloatingPanelContext()
  const mergedProps = mergeProps(floatingPanel.getControlProps(), props)

  return <ark.div {...mergedProps} ref={ref} />
})

FloatingPanelControl.displayName = 'FloatingPanelControl'
