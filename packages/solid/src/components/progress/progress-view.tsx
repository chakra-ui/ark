import type { ViewProps } from '@zag-js/progress'
import { mergeProps } from '@zag-js/solid'
import type { JSX } from 'solid-js'
import { createSplitProps } from '../../utils/create-split-props'
import { type PolymorphicProps, ark } from '../factory'
import { useProgressContext } from './use-progress-context'

export interface ProgressViewBaseProps extends ViewProps, PolymorphicProps<'span'> {}
export interface ProgressViewProps
  extends JSX.HTMLAttributes<HTMLSpanElement>,
    ProgressViewBaseProps {}

export const ProgressView = (props: ProgressViewProps) => {
  const [state, localProps] = createSplitProps<ViewProps>()(props, ['state'])
  const api = useProgressContext()
  const mergedProps = mergeProps(() => api().getViewProps(state), localProps)

  return <ark.span {...mergedProps} />
}
