import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useFloatingPanelContext } from './use-floating-panel-context'

export interface FloatingPanelTitleBaseProps extends PolymorphicProps<'h2'> {}
export interface FloatingPanelTitleProps extends HTMLProps<'h2'>, FloatingPanelTitleBaseProps {}

export const FloatingPanelTitle = (props: FloatingPanelTitleProps) => {
  const floatingPanel = useFloatingPanelContext()
  const mergedProps = mergeProps(() => floatingPanel().getTitleProps(), props)

  return <ark.h2 {...mergedProps} />
}
