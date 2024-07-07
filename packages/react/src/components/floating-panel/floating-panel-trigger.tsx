import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { usePresenceContext } from '../presence'
import { useFloatingPanelContext } from './use-floating-panel-context'

export interface FloatingPanelTriggerBaseProps extends PolymorphicProps {}
export interface FloatingPanelTriggerProps
  extends HTMLProps<'button'>,
    FloatingPanelTriggerBaseProps {}

export const FloatingPanelTrigger = forwardRef<HTMLButtonElement, FloatingPanelTriggerProps>(
  (props, ref) => {
    const floatingPanel = useFloatingPanelContext()
    const presence = usePresenceContext()
    const mergedProps = mergeProps(
      {
        ...floatingPanel.getTriggerProps(),
        'aria-controls': presence.unmounted
          ? undefined
          : floatingPanel.getTriggerProps()['aria-controls'],
      },
      props,
    )

    return <ark.button {...mergedProps} ref={ref} />
  },
)

FloatingPanelTrigger.displayName = 'FloatingPanelTrigger'
