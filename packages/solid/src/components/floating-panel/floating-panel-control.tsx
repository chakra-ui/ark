import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useFloatingPanelContext } from './use-floating-panel-context'

export interface FloatingPanelControlBaseProps extends PolymorphicProps<'div'> {}
export interface FloatingPanelControlProps extends HTMLProps<'div'>, FloatingPanelControlBaseProps {}

export const FloatingPanelControl = (props: FloatingPanelControlProps) => {
  const floatingPanel = useFloatingPanelContext()
  const mergedProps = mergeProps(() => floatingPanel().getControlProps(), props)

  return <ark.div {...mergedProps} />
}
