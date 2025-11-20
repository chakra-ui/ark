import { mergeProps } from '@zag-js/react'
import type { ResizeTriggerProps } from '@zag-js/splitter'
import { forwardRef } from 'react'
import type { Assign } from '../../types'
import { createSplitProps } from '../../utils/create-split-props'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useSplitterContext } from './use-splitter-context'
import { SplitterResizeTriggerPropsProvider } from './use-splitter-resize-trigger-props-context'

export interface SplitterResizeTriggerBaseProps extends ResizeTriggerProps, PolymorphicProps {}
export interface SplitterResizeTriggerProps extends Assign<HTMLProps<'button'>, SplitterResizeTriggerBaseProps> {}

const splitResizeTriggerProps = createSplitProps<ResizeTriggerProps>()

export const SplitterResizeTrigger = forwardRef<HTMLButtonElement, SplitterResizeTriggerProps>((props, ref) => {
  const [triggerProps, localProps] = splitResizeTriggerProps(props, ['disabled', 'id'])
  const splitter = useSplitterContext()
  const mergedProps = mergeProps(splitter.getResizeTriggerProps(triggerProps), localProps)

  return (
    <SplitterResizeTriggerPropsProvider value={triggerProps}>
      <ark.button ref={ref} {...mergedProps} />
    </SplitterResizeTriggerPropsProvider>
  )
})

SplitterResizeTrigger.displayName = 'SplitterResizeTrigger'
