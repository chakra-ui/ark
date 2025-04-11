import type { StageTriggerProps } from '@zag-js/floating-panel'
import { mergeProps } from '@zag-js/solid'
import { createSplitProps } from '../../utils/create-split-props'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useFloatingPanelContext } from './use-floating-panel-context'

export interface FloatingPanelStageTriggerBaseProps extends PolymorphicProps<'button'>, StageTriggerProps {}
export interface FloatingPanelStageTriggerProps extends HTMLProps<'button'>, FloatingPanelStageTriggerBaseProps {}

export const FloatingPanelStageTrigger = (props: FloatingPanelStageTriggerProps) => {
  const [stage, localProps] = createSplitProps<StageTriggerProps>()(props, ['stage'])
  const floatingPanel = useFloatingPanelContext()
  const mergedProps = mergeProps(() => floatingPanel().getStageTriggerProps(stage), localProps)

  return <ark.button {...mergedProps} />
}
