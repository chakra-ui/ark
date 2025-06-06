import type { ResizeTriggerProps } from '@zag-js/floating-panel'
import { mergeProps } from '@zag-js/solid'
import { createSplitProps } from '../../utils/create-split-props'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useFloatingPanelContext } from './use-floating-panel-context'

export interface FloatingPanelResizeTriggerBaseProps extends ResizeTriggerProps, PolymorphicProps<'div'> {}
export interface FloatingPanelResizeTriggerProps extends HTMLProps<'div'>, FloatingPanelResizeTriggerBaseProps {}

export const FloatingPanelResizeTrigger = (props: FloatingPanelResizeTriggerProps) => {
  const [resizeProps, localProps] = createSplitProps<ResizeTriggerProps>()(props, ['axis'])
  const floatingPanel = useFloatingPanelContext()
  const mergedProps = mergeProps(() => floatingPanel().getResizeTriggerProps(resizeProps), localProps)

  return <ark.div {...mergedProps} />
}
