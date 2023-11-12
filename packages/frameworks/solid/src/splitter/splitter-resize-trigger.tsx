import { mergeProps } from '@zag-js/solid'
import { connect } from '@zag-js/splitter'
import { createSplitProps } from '../create-split-props'
import { ark, type HTMLArkProps } from '../factory'
import type { Assign } from '../types'
import { useSplitterContext } from './splitter-context'

type TriggerParams = Parameters<ReturnType<typeof connect>['getResizeTriggerProps']>[0]

export interface SplitterResizeTriggerProps extends Assign<HTMLArkProps<'button'>, TriggerParams> {}

export const SplitterResizeTrigger = (props: SplitterResizeTriggerProps) => {
  const api = useSplitterContext()
  const [triggerParams, restProps] = createSplitProps<TriggerParams>()(props, [
    'disabled',
    'id',
    'step',
  ])
  const mergedProps = mergeProps(() => api().getResizeTriggerProps(triggerParams), restProps)

  return <ark.button {...mergedProps} />
}
