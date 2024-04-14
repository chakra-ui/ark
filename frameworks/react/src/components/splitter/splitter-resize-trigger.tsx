import { mergeProps } from '@zag-js/react'
import type { ResizeTriggerProps } from '@zag-js/splitter'
import { forwardRef } from 'react'
import type { Assign } from '../../types'
import { createSplitProps } from '../../utils/create-split-props'
import { type HTMLArkProps, ark } from '../factory'
import { useSplitterContext } from './use-splitter-context'

export interface SplitterResizeTriggerProps
  extends Assign<HTMLArkProps<'button'>, ResizeTriggerProps> {}

export const SplitterResizeTrigger = forwardRef<HTMLButtonElement, SplitterResizeTriggerProps>(
  (props, ref) => {
    const [triggerProps, localProps] = createSplitProps<ResizeTriggerProps>()(props, [
      'disabled',
      'id',
      'step',
    ])
    const splitter = useSplitterContext()
    const mergedProps = mergeProps(splitter.getResizeTriggerProps(triggerProps), localProps)

    return <ark.button ref={ref} {...mergedProps} />
  },
)

SplitterResizeTrigger.displayName = 'SplitterResizeTrigger'
