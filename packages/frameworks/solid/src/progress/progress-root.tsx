import { mergeProps } from '@zag-js/solid'
import type { JSX } from 'solid-js'
import { createSplitProps } from '../create-split-props'
import { ark, type ArkComponent, type HTMLArkProps } from '../factory'
import { runIfFn } from '../run-if-fn'
import { type Assign } from '../types'
import { ProgressProvider } from './progress-context'
import { useProgress, type UseProgressProps, type UseProgressReturn } from './use-progress'

interface ElementProps extends UseProgressProps {
  children?: JSX.Element | ((api: UseProgressReturn) => JSX.Element)
}

export interface ProgressRootProps extends Assign<HTMLArkProps<'div'>, ElementProps> {}

export const ProgressRoot: ArkComponent<'div', ElementProps> = (props: ProgressRootProps) => {
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

  const getChildren = () => runIfFn(localProps.children, api)

  return (
    <ProgressProvider value={api}>
      <ark.div {...mergedProps}>{getChildren()}</ark.div>
    </ProgressProvider>
  )
}
