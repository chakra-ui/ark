import type { IndicatorProps } from '@zag-js/progress'
import { mergeProps } from '@zag-js/solid'
import { createSplitProps } from '../create-split-props'
import { ark, type HTMLArkProps } from '../factory'
import type { Assign } from '../types'
import { useProgressContext } from './progress-context'

export interface ProgressIndicatorProps extends Assign<HTMLArkProps<'span'>, IndicatorProps> {}

export const ProgressIndicator = (props: ProgressIndicatorProps) => {
  const [state, localProps] = createSplitProps<IndicatorProps>()(props, ['state'])
  const api = useProgressContext()
  const mergedProps = mergeProps(() => api().getIndicatorProps(state), localProps)

  return <ark.span {...mergedProps} />
}
