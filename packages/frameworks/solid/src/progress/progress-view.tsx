import type { ViewProps } from '@zag-js/progress'
import { mergeProps } from '@zag-js/solid'
import { createSplitProps } from '../create-split-props'
import { ark, type HTMLArkProps } from '../factory'
import type { Assign } from '../types'
import { useProgressContext } from './progress-context'

export interface ProgressViewProps extends Assign<HTMLArkProps<'span'>, ViewProps> {}

export const ProgressView = (props: ProgressViewProps) => {
  const [state, localProps] = createSplitProps<ViewProps>()(props, ['state'])
  const api = useProgressContext()
  const mergedProps = mergeProps(() => api().getViewProps(state), localProps)

  return <ark.span {...mergedProps} />
}
