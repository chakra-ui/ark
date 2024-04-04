import { mergeProps } from '@zag-js/solid'
import { createSplitProps } from '../create-split-props'
import { ark, type HTMLArkProps } from '../factory'
import { type Assign } from '../types'
import { useProgress, type UseProgressProps } from './use-progress'
import { ProgressProvider } from './use-progress-context'

export interface ProgressRootProps extends Assign<HTMLArkProps<'div'>, UseProgressProps> {}

export const ProgressRoot = (props: ProgressRootProps) => {
  const [progressProps, localProps] = createSplitProps<UseProgressProps>()(props, [
    'dir',
    'getRootNode',
    'id',
    'max',
    'min',
    'orientation',
    'translations',
    'value',
  ])

  const api = useProgress(progressProps)
  const mergedProps = mergeProps(() => api().rootProps, localProps)

  return (
    <ProgressProvider value={api}>
      <ark.div {...mergedProps()} />
    </ProgressProvider>
  )
}
