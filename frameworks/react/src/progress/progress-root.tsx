import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { createSplitProps } from '../create-split-props'
import { ark, type HTMLArkProps } from '../factory'
import { type Assign } from '../types'
import { useProgress, type UseProgressProps } from './use-progress'
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
  const context = useProgress(progressProps)
  const mergedProps = mergeProps(context.rootProps, localProps)

  return (
    <ProgressProvider value={context}>
      <ark.div {...mergedProps} ref={ref} />
    </ProgressProvider>
  )
})

ProgressRoot.displayName = 'ProgressRoot'
