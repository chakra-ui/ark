import { mergeProps } from '@zag-js/solid'
import { createSplitProps } from '../../utils/create-split-props'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { type UseProgressProps, useProgress } from './use-progress'
import { ProgressProvider } from './use-progress-context'

export interface ProgressRootBaseProps extends UseProgressProps, PolymorphicProps<'div'> {}
export interface ProgressRootProps extends HTMLProps<'div'>, ProgressRootBaseProps {}

export const ProgressRoot = (props: ProgressRootProps) => {
  const [progressProps, localProps] = createSplitProps<UseProgressProps>()(props, [
    'id',
    'ids',
    'max',
    'min',
    'orientation',
    'translations',
    'value',
  ])

  const api = useProgress(progressProps)
  const mergedProps = mergeProps(() => api().getRootProps(), localProps)

  return (
    <ProgressProvider value={api}>
      <ark.div {...mergedProps} />
    </ProgressProvider>
  )
}
