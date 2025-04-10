import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useFloatingPanelContext } from './use-floating-panel-context'

export interface FloatingPanelBodyBaseProps extends PolymorphicProps<'div'> {}
export interface FloatingPanelBodyProps extends HTMLProps<'div'>, FloatingPanelBodyBaseProps {}

export const FloatingPanelBody = (props: FloatingPanelBodyProps) => {
  const floatingPanel = useFloatingPanelContext()
  const mergedProps = mergeProps(() => floatingPanel().getBodyProps(), props)
  return <ark.div {...mergedProps} />
}
