import { mergeProps } from '@zag-js/solid'
import type { JSX } from 'solid-js'
import { type PolymorphicProps, ark } from '../factory'
import { useProgressContext } from './use-progress-context'

export interface ProgressRangeBaseProps extends PolymorphicProps<'div'> {}
export interface ProgressRangeProps
  extends JSX.HTMLAttributes<HTMLDivElement>,
    ProgressRangeBaseProps {}

export const ProgressRange = (props: ProgressRangeProps) => {
  const api = useProgressContext()
  const mergedProps = mergeProps(() => api().getRangeProps(), props)

  return <ark.div {...mergedProps} />
}
