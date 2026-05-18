import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.tsx'
import { usePresenceContext } from '../presence/index.tsx'
import { useFloatingPanelContext } from './use-floating-panel-context.ts'

export interface FloatingPanelContentBaseProps extends PolymorphicProps<'div'> {}
export interface FloatingPanelContentProps extends HTMLProps<'div'>, FloatingPanelContentBaseProps {}

export const FloatingPanelContent = (props: FloatingPanelContentProps) => {
  const floatingPanel = useFloatingPanelContext()
  const presence = usePresenceContext()
  const mergedProps = mergeProps(
    () => floatingPanel().getContentProps(),
    () => presence().presenceProps,
    props,
  )

  if (presence().unmounted) {
    return null
  }

  return <ark.div {...mergedProps} />
}
