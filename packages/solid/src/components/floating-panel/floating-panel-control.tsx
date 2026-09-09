import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.tsx'
import { useFloatingPanelContext } from './use-floating-panel-context.ts'
import type { ControlState } from '@zag-js/floating-panel'

export interface FloatingPanelControlState extends ControlState {}

export interface FloatingPanelControlBaseProps extends PolymorphicProps<'div', FloatingPanelControlState> {}
export interface FloatingPanelControlProps extends HTMLProps<'div'>, FloatingPanelControlBaseProps {}

export const FloatingPanelControl = (props: FloatingPanelControlProps) => {
  const floatingPanel = useFloatingPanelContext()
  const mergedProps = mergeProps(() => floatingPanel().getControlProps(), props)

  return <ark.div {...mergedProps} state={floatingPanel().getControlState()} />
}
