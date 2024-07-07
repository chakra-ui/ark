import type { ResizeTriggerProps } from '@zag-js/floating-panel'
import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { createSplitProps } from '../../utils/create-split-props'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useFloatingPanelContext } from './use-floating-panel-context'

export interface FloatingPanelResizeTriggerBaseProps extends ResizeTriggerProps, PolymorphicProps {}
export interface FloatingPanelResizeTriggerProps
  extends HTMLProps<'button'>,
    FloatingPanelResizeTriggerBaseProps {}

export const FloatingPanelResizeTrigger = forwardRef<
  HTMLButtonElement,
  FloatingPanelResizeTriggerProps
>((props, ref) => {
  const [resizeProps, localProps] = createSplitProps<ResizeTriggerProps>()(props, ['axis'])
  const floatingPanel = useFloatingPanelContext()
  const mergedProps = mergeProps(floatingPanel.getResizeTriggerProps(resizeProps), localProps)

  return <ark.button {...mergedProps} ref={ref} />
})

FloatingPanelResizeTrigger.displayName = 'FloatingPanelResizeTrigger'
