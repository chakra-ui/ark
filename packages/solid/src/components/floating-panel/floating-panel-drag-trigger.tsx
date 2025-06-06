import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useFloatingPanelContext } from './use-floating-panel-context'

export interface FloatingPanelDragTriggerBaseProps extends PolymorphicProps<'div'> {}
export interface FloatingPanelDragTriggerProps extends HTMLProps<'div'>, FloatingPanelDragTriggerBaseProps {}

export const FloatingPanelDragTrigger = (props: FloatingPanelDragTriggerProps) => {
  const floatingPanel = useFloatingPanelContext()
  const mergedProps = mergeProps(() => floatingPanel().getDragTriggerProps(), props)

  return <ark.div {...mergedProps} />
}
