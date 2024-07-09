import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useFloatingPanelContext } from './use-floating-panel-context'

export interface FloatingPanelMaximizeTriggerBaseProps extends PolymorphicProps {}
export interface FloatingPanelMaximizeTriggerProps
  extends HTMLProps<'button'>,
    FloatingPanelMaximizeTriggerBaseProps {}

export const FloatingPanelMaximizeTrigger = forwardRef<
  HTMLButtonElement,
  FloatingPanelMaximizeTriggerProps
>((props, ref) => {
  const floatingPanel = useFloatingPanelContext()
  const mergedProps = mergeProps(floatingPanel.getMaximizeTriggerProps(), props)

  return <ark.button {...mergedProps} ref={ref} />
})

FloatingPanelMaximizeTrigger.displayName = 'FloatingPanelMaximizeTrigger'
