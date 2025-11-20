import type { ResizeTriggerProps } from '@zag-js/floating-panel'
import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { createSplitProps } from '../../utils/create-split-props'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useFloatingPanelContext } from './use-floating-panel-context'

export interface FloatingPanelResizeTriggerBaseProps extends ResizeTriggerProps, PolymorphicProps {}
export interface FloatingPanelResizeTriggerProps extends HTMLProps<'div'>, FloatingPanelResizeTriggerBaseProps {}

const splitResizeTriggerProps = createSplitProps<ResizeTriggerProps>()

export const FloatingPanelResizeTrigger = forwardRef<HTMLDivElement, FloatingPanelResizeTriggerProps>((props, ref) => {
  const [resizeProps, localProps] = splitResizeTriggerProps(props, ['axis'])
  const floatingPanel = useFloatingPanelContext()
  const mergedProps = mergeProps(floatingPanel.getResizeTriggerProps(resizeProps), localProps)

  return <ark.div {...mergedProps} ref={ref} />
})

FloatingPanelResizeTrigger.displayName = 'FloatingPanelResizeTrigger'
