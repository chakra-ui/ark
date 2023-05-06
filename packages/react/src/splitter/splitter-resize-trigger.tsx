import { mergeProps } from '@zag-js/react'
import { type connect } from '@zag-js/splitter'
import { createSplitProps } from '../create-split-props'
import { ark } from '../factory'
import { forwardRef } from '../forward-ref'
import { useSplitterContext } from './splitter-context'

type ResizeTriggerProps = Parameters<ReturnType<typeof connect>['getResizeTriggerProps']>[0]

export type SplitterResizeTriggerProps = ResizeTriggerProps

export const SplitterResizeTrigger = forwardRef<'button', SplitterResizeTriggerProps>(
  (props, ref) => {
    const [triggerProps, restProps] = createSplitProps<ResizeTriggerProps>()(props, [
      'disabled',
      'id',
      'step',
    ])
    const { getResizeTriggerProps } = useSplitterContext()
    const mergedProps = mergeProps(getResizeTriggerProps(triggerProps), restProps)
    return <ark.button ref={ref} {...mergedProps} />
  },
)
