import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useFloatingPanelContext } from './use-floating-panel-context'

export interface FloatingPanelHeaderBaseProps extends PolymorphicProps<'div'> {}
export interface FloatingPanelHeaderProps extends HTMLProps<'div'>, FloatingPanelHeaderBaseProps {}

export const FloatingPanelHeader = (props: FloatingPanelHeaderProps) => {
  const floatingPanel = useFloatingPanelContext()
  const mergedProps = mergeProps(() => floatingPanel().getHeaderProps(), props)

  return <ark.div {...mergedProps} />
}
