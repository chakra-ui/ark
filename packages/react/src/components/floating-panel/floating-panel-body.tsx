import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useFloatingPanelContext } from './use-floating-panel-context'

export interface FloatingPanelBodyBaseProps extends PolymorphicProps {}
export interface FloatingPanelBodyProps extends HTMLProps<'div'>, FloatingPanelBodyBaseProps {}

export const FloatingPanelBody = forwardRef<HTMLDivElement, FloatingPanelBodyProps>(
  (props, ref) => {
    const floatingPanel = useFloatingPanelContext()
    const mergedProps = mergeProps(floatingPanel.getBodyProps(), props)

    return <ark.div {...mergedProps} ref={ref} />
  },
)

FloatingPanelBody.displayName = 'FloatingPanelBody'
