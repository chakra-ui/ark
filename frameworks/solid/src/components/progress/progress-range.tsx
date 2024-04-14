import { mergeProps } from '@zag-js/solid'
import { type HTMLArkProps, ark } from '../factory'
import { useProgressContext } from './use-progress-context'

export interface ProgressRangeProps extends HTMLArkProps<'div'> {}

export const ProgressRange = (props: ProgressRangeProps) => {
  const api = useProgressContext()
  const mergedProps = mergeProps(() => api().rangeProps, props)

  return <ark.div {...mergedProps} />
}
