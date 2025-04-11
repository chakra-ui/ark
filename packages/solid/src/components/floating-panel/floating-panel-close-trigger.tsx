import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useFloatingPanelContext } from './use-floating-panel-context'

export interface FloatingPanelCloseTriggerBaseProps extends PolymorphicProps<'button'> {}
export interface FloatingPanelCloseTriggerProps extends HTMLProps<'button'>, FloatingPanelCloseTriggerBaseProps {}

export const FloatingPanelCloseTrigger = (props: FloatingPanelCloseTriggerProps) => {
  const floatingPanel = useFloatingPanelContext()
  const mergedProps = mergeProps(() => floatingPanel().getCloseTriggerProps(), props)

  return <ark.button {...mergedProps} />
}
