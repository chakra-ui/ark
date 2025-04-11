import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { usePresenceContext } from '../presence'
import { useFloatingPanelContext } from './use-floating-panel-context'

export interface FloatingPanelPositionerBaseProps extends PolymorphicProps {}
export interface FloatingPanelPositionerProps
  extends HTMLProps<'div'>,
    FloatingPanelPositionerBaseProps {}

export const FloatingPanelPositioner = forwardRef<HTMLDivElement, FloatingPanelPositionerProps>(
  (props, ref) => {
    const floatingPanel = useFloatingPanelContext()
    const mergedProps = mergeProps(floatingPanel.getPositionerProps(), props)
    const presence = usePresenceContext()

    if (presence.unmounted) {
      return null
    }

    return <ark.div {...mergedProps} ref={ref} />
  },
)

FloatingPanelPositioner.displayName = 'FloatingPanelPositioner'
