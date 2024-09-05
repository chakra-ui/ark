import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useFloatingPanelContext } from './use-floating-panel-context'

export interface FloatingPanelCloseTriggerBaseProps extends PolymorphicProps {}
export interface FloatingPanelCloseTriggerProps
  extends HTMLProps<'button'>,
    FloatingPanelCloseTriggerBaseProps {}

export const FloatingPanelCloseTrigger = forwardRef<
  HTMLButtonElement,
  FloatingPanelCloseTriggerProps
>((props, ref) => {
  const floatingPanel = useFloatingPanelContext()
  const mergedProps = mergeProps(floatingPanel.getCloseTriggerProps(), props)

  return <ark.button {...mergedProps} ref={ref} />
})

FloatingPanelCloseTrigger.displayName = 'FloatingPanelCloseTrigger'
