import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { createSplitProps } from '../../utils/create-split-props'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { type UseProgressProps, useProgress } from './use-progress'
import { ProgressProvider } from './use-progress-context'

export interface ProgressRootBaseProps extends UseProgressProps, PolymorphicProps {}
export interface ProgressRootProps extends HTMLProps<'div'>, ProgressRootBaseProps {}

export const ProgressRoot = forwardRef<HTMLDivElement, ProgressRootProps>((props, ref) => {
  const [progressProps, localProps] = createSplitProps<UseProgressProps>()(props, [
    'id',
    'ids',
    'max',
    'min',
    'orientation',
    'translations',
    'value',
  ])
  const progress = useProgress(progressProps)
  const mergedProps = mergeProps(progress.getRootProps(), localProps)

  return (
    <ProgressProvider value={progress}>
      <ark.div {...mergedProps} ref={ref} />
    </ProgressProvider>
  )
})

ProgressRoot.displayName = 'ProgressRoot'
