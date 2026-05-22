'use client'

import type { ViewProps } from '@zag-js/progress'
import { mergeProps } from '@zag-js/react'
import { createSplitProps } from '../../utils/create-split-props'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useProgressContext } from './use-progress-context'

export interface ProgressViewBaseProps extends ViewProps, PolymorphicProps {}
export interface ProgressViewProps extends HTMLProps<'span'>, ProgressViewBaseProps {}

const splitViewProps = createSplitProps<ViewProps>()

export const ProgressView = ({ ref, ...props }: ProgressViewProps) => {
  const [viewProps, localProps] = splitViewProps(props, ['state'])
  const progress = useProgressContext()
  const mergedProps = mergeProps(progress.getViewProps(viewProps), localProps)

  return <ark.span {...mergedProps} ref={ref} />
}

ProgressView.displayName = 'ProgressView'
