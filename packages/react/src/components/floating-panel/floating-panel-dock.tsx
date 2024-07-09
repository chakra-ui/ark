import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'

export interface FloatingPanelDockBaseProps extends PolymorphicProps {}
export interface FloatingPanelDockProps extends HTMLProps<'div'>, FloatingPanelDockBaseProps {}

export const FloatingPanelDock = forwardRef<HTMLDivElement, FloatingPanelDockProps>(
  (props, ref) => {
    return <ark.div data-scope="floating-panel" data-part="dock" {...props} ref={ref} />
  },
)

FloatingPanelDock.displayName = 'FloatingPanelDock'
