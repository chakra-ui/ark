import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { usePresenceContext } from '../presence'
import { useFloatingPanelContext } from './use-floating-panel-context'

export interface FloatingPanelPositionerBaseProps extends PolymorphicProps<'div'> {}
export interface FloatingPanelPositionerProps extends HTMLProps<'div'>, FloatingPanelPositionerBaseProps {}

export const FloatingPanelPositioner = (props: FloatingPanelPositionerProps) => {
  const floatingPanel = useFloatingPanelContext()
  const mergedProps = mergeProps(() => floatingPanel().getPositionerProps(), props)
  const presence = usePresenceContext()

  if (presence().unmounted) {
    return null
  }

  return <ark.div {...mergedProps} />
}
