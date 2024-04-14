import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLArkProps, ark } from '../../factory'
import type { Assign } from '../../types'
import { createSplitProps } from '../../utils/create-split-props'
import { type UseProgressProps, useProgress } from './use-progress'
import { ProgressProvider } from './use-progress-context'

export interface ProgressRootProps extends Assign<HTMLArkProps<'div'>, UseProgressProps> {}

export const ProgressRoot = forwardRef<HTMLDivElement, ProgressRootProps>((props, ref) => {
  const [progressProps, localProps] = createSplitProps<UseProgressProps>()(props, [
    'defaultValue',
    'dir',
    'getRootNode',
    'id',
    'max',
    'min',
    'orientation',
    'translations',
    'value',
  ])
  const progress = useProgress(progressProps)
  const mergedProps = mergeProps(progress.rootProps, localProps)

  return (
    <ProgressProvider value={progress}>
      <ark.div {...mergedProps} ref={ref} />
    </ProgressProvider>
  )
})

ProgressRoot.displayName = 'ProgressRoot'
