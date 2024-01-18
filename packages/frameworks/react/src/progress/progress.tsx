import { mergeProps } from '@zag-js/react'
import { forwardRef, type ReactNode } from 'react'
import { createSplitProps } from '../create-split-props'
import { ark, type HTMLArkProps } from '../factory'
import { runIfFn } from '../run-if-fn'
import { type Assign } from '../types'
import { ProgressProvider } from './progress-context'
import { useProgress, type UseProgressProps, type UseProgressReturn } from './use-progress'

export interface ProgressProps
  extends Assign<
    Assign<HTMLArkProps<'div'>, { children?: ReactNode | ((api: UseProgressReturn) => ReactNode) }>,
    UseProgressProps
  > {}

export const Progress = forwardRef<HTMLDivElement, ProgressProps>((props, ref) => {
  const [progressProps, { children, ...localProps }] = createSplitProps<UseProgressProps>()(props, [
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

  const api = useProgress(progressProps)
  const mergedProps = mergeProps(api.rootProps, localProps)

  const view = runIfFn(children, api)

  return (
    <ProgressProvider value={api}>
      <ark.div {...mergedProps} ref={ref}>
        {view}
      </ark.div>
    </ProgressProvider>
  )
})

Progress.displayName = 'Progress'
