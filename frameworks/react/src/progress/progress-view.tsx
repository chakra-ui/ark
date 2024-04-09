import type { ViewProps } from '@zag-js/progress'
import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { createSplitProps } from '../create-split-props'
import { ark, type HTMLArkProps } from '../factory'
import type { Assign } from '../types'
import { useProgressContext } from './use-progress-context'

export interface ProgressViewProps extends Assign<HTMLArkProps<'span'>, ViewProps> {}

export const ProgressView = forwardRef<HTMLSpanElement, ProgressViewProps>((props, ref) => {
  const [viewProps, localProps] = createSplitProps<ViewProps>()(props, ['state'])
  const progress = useProgressContext()
  const mergedProps = mergeProps(progress.getViewProps(viewProps), localProps)

  return <ark.span {...mergedProps} ref={ref} />
})

ProgressView.displayName = 'ProgressView'
