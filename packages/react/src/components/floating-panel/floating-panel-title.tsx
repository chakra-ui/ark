import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useFloatingPanelContext } from './use-floating-panel-context'

export interface FloatingPanelTitleBaseProps extends PolymorphicProps {}
export interface FloatingPanelTitleProps extends HTMLProps<'p'>, FloatingPanelTitleBaseProps {}

export const FloatingPanelTitle = forwardRef<HTMLDivElement, FloatingPanelTitleProps>(
  (props, ref) => {
    const floatingPanel = useFloatingPanelContext()
    const mergedProps = mergeProps(floatingPanel.getTitleProps(), props)

    return <ark.div {...mergedProps} ref={ref} />
  },
)

FloatingPanelTitle.displayName = 'FloatingPanelTitle'
