import { mergeProps } from '@zag-js/solid'
import { ark, type HTMLArkProps } from '../factory'
import { useProgressContext } from './progress-context'

export interface ProgressRangeProps extends HTMLArkProps<'div'> {}

export const ProgressRange = (props: ProgressRangeProps) => {
  const api = useProgressContext()
  const mergedProps = mergeProps(() => api().rangeProps, props)

  return <ark.div {...mergedProps} />
}
