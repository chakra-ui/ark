import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useFloatingPanelContext } from './use-floating-panel-context'

export interface FloatingPanelRestoreTriggerBaseProps extends PolymorphicProps {}
export interface FloatingPanelRestoreTriggerProps
  extends HTMLProps<'button'>,
    FloatingPanelRestoreTriggerBaseProps {}

export const FloatingPanelRestoreTrigger = forwardRef<
  HTMLButtonElement,
  FloatingPanelRestoreTriggerProps
>((props, ref) => {
  const floatingPanel = useFloatingPanelContext()
  const mergedProps = mergeProps(floatingPanel.getRestoreTriggerProps(), props)

  return <ark.button {...mergedProps} ref={ref} />
})

FloatingPanelRestoreTrigger.displayName = 'FloatingPanelRestoreTrigger'
