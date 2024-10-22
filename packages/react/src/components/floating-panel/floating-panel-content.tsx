import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { composeRefs } from '../../utils/compose-refs'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { usePresenceContext } from '../presence'
import { useFloatingPanelContext } from './use-floating-panel-context'

export interface FloatingPanelContentBaseProps extends PolymorphicProps {}
export interface FloatingPanelContentProps
  extends HTMLProps<'div'>,
    FloatingPanelContentBaseProps {}

export const FloatingPanelContent = forwardRef<HTMLDivElement, FloatingPanelContentProps>(
  (props, ref) => {
    const floatingPanel = useFloatingPanelContext()
    const presence = usePresenceContext()
    const mergedProps = mergeProps(
      floatingPanel.getContentProps(),
      presence.getPresenceProps(),
      props,
    )

    if (presence.unmounted) {
      return null
    }

    return <ark.div {...mergedProps} ref={composeRefs(presence.ref, ref)} />
  },
)

FloatingPanelContent.displayName = 'FloatingPanelContent'
