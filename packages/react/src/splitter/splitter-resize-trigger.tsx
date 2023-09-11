import { mergeProps } from '@zag-js/react'
import { type ResizeTriggerProps } from '@zag-js/splitter'
import { forwardRef } from 'react'
import { createSplitProps } from '../create-split-props'
import { ark, type HTMLArkProps } from '../factory'
import type { Assign } from '../types'
import { useSplitterContext } from './splitter-context'

export type SplitterResizeTriggerProps = Assign<HTMLArkProps<'button'>, ResizeTriggerProps>

export const SplitterResizeTrigger = forwardRef<HTMLButtonElement, SplitterResizeTriggerProps>(
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

SplitterResizeTrigger.displayName = 'SplitterResizeTrigger'
