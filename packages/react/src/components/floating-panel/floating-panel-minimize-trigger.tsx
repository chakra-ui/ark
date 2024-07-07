import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useFloatingPanelContext } from './use-floating-panel-context'

export interface FloatingPanelMinimizeTriggerBaseProps extends PolymorphicProps {}
export interface FloatingPanelMinimizeTriggerProps
  extends HTMLProps<'button'>,
    FloatingPanelMinimizeTriggerBaseProps {}

export const FloatingPanelMinimizeTrigger = forwardRef<
  HTMLButtonElement,
  FloatingPanelMinimizeTriggerProps
>((props, ref) => {
  const floatingPanel = useFloatingPanelContext()
  const mergedProps = mergeProps(floatingPanel.getMinimizeTriggerProps(), props)

  return <ark.button {...mergedProps} ref={ref} />
})

FloatingPanelMinimizeTrigger.displayName = 'FloatingPanelMinimizeTrigger'
