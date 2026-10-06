'use client'

import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.ts'
import { useSplitterContext } from './use-splitter-context.ts'
import { useSplitterResizeTriggerPropsContext } from './use-splitter-resize-trigger-props-context.ts'

export interface SplitterResizeTriggerIndicatorBaseProps extends PolymorphicProps {}
export interface SplitterResizeTriggerIndicatorProps
  extends HTMLProps<'span'>, SplitterResizeTriggerIndicatorBaseProps {}

export const SplitterResizeTriggerIndicator = forwardRef<HTMLSpanElement, SplitterResizeTriggerIndicatorProps>(
  (props, ref) => {
    const splitter = useSplitterContext()
    const triggerProps = useSplitterResizeTriggerPropsContext()
    const mergedProps = mergeProps(splitter.getResizeTriggerIndicator(triggerProps), props)

    return <ark.span ref={ref} {...mergedProps} />
  },
)

SplitterResizeTriggerIndicator.displayName = 'SplitterResizeTriggerIndicator'
