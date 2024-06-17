import { mergeProps } from '@zag-js/solid'
import type { ResizeTriggerProps } from '@zag-js/splitter'
import type { JSX } from 'solid-js'
import type { Assign } from '../../types'
import { createSplitProps } from '../../utils/create-split-props'
import { type PolymorphicProps, ark } from '../factory'
import { useSplitterContext } from './use-splitter-context'

export interface SplitterResizeTriggerBaseProps
  extends ResizeTriggerProps,
    PolymorphicProps<'button'> {}
export interface SplitterResizeTriggerProps
  extends Assign<JSX.HTMLAttributes<HTMLButtonElement>, SplitterResizeTriggerBaseProps> {}

export const SplitterResizeTrigger = (props: SplitterResizeTriggerProps) => {
  const [resizeTriggerProps, restProps] = createSplitProps<ResizeTriggerProps>()(props, [
    'disabled',
    'id',
    'step',
  ])
  const api = useSplitterContext()
  const mergedProps = mergeProps(() => api().getResizeTriggerProps(resizeTriggerProps), restProps)

  return <ark.button {...mergedProps} />
}
