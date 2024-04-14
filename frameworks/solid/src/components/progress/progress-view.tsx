import type { ViewProps } from '@zag-js/progress'
import { mergeProps } from '@zag-js/solid'
import type { Assign } from '../../types'
import { createSplitProps } from '../../utils/create-split-props'
import { type HTMLArkProps, ark } from '../factory'
import { useProgressContext } from './use-progress-context'

export interface ProgressViewProps extends Assign<HTMLArkProps<'span'>, ViewProps> {}

export const ProgressView = (props: ProgressViewProps) => {
  const [state, localProps] = createSplitProps<ViewProps>()(props, ['state'])
  const api = useProgressContext()
  const mergedProps = mergeProps(() => api().getViewProps(state), localProps)

  return <ark.span {...mergedProps} />
}
