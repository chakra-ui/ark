'use client'

import { mergeProps } from '@zag-js/react'
import type { ResizeTriggerProps, ResizeTriggerState } from '@zag-js/splitter'
import { forwardRef } from 'react'
import type { Assign } from '../../types.ts'
import { createSplitProps } from '../../utils/create-split-props.ts'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.ts'
import { useSplitterContext } from './use-splitter-context.ts'
import { SplitterResizeTriggerPropsProvider } from './use-splitter-resize-trigger-props-context.ts'

export interface SplitterResizeTriggerState extends ResizeTriggerState {}

export interface SplitterResizeTriggerBaseProps
  extends ResizeTriggerProps, PolymorphicProps<SplitterResizeTriggerState> {}
export interface SplitterResizeTriggerProps extends Assign<HTMLProps<'button'>, SplitterResizeTriggerBaseProps> {}

const splitResizeTriggerProps = createSplitProps<ResizeTriggerProps>()

export const SplitterResizeTrigger = forwardRef<HTMLButtonElement, SplitterResizeTriggerProps>((props, ref) => {
  const [triggerProps, localProps] = splitResizeTriggerProps(props, ['disabled', 'id'])
  const splitter = useSplitterContext()
  const mergedProps = mergeProps(splitter.getResizeTriggerProps(triggerProps), localProps)

  return (
    <SplitterResizeTriggerPropsProvider value={triggerProps}>
      <ark.button ref={ref} {...mergedProps} state={splitter.getResizeTriggerState(triggerProps)} />
    </SplitterResizeTriggerPropsProvider>
  )
})

SplitterResizeTrigger.displayName = 'SplitterResizeTrigger'
