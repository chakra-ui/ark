import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { createSplitProps } from '../../utils/create-split-props'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useFloatingPanelContext } from './use-floating-panel-context'

interface StageTriggerProps {
  stage: 'minimized' | 'maximized' | 'default'
}

export interface FloatingPanelStageTriggerBaseProps extends PolymorphicProps, StageTriggerProps {}
export interface FloatingPanelStageTriggerProps extends HTMLProps<'button'>, FloatingPanelStageTriggerBaseProps {}

export const FloatingPanelStageTrigger = forwardRef<HTMLButtonElement, FloatingPanelStageTriggerProps>((props, ref) => {
  const [stage, localProps] = createSplitProps<StageTriggerProps>()(props, ['stage'])
  const floatingPanel = useFloatingPanelContext()
  const mergedProps = mergeProps(floatingPanel.getStageTriggerProps(stage), localProps)

  return <ark.button {...mergedProps} ref={ref} />
})

FloatingPanelStageTrigger.displayName = 'FloatingPanelStageTrigger'
