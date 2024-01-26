import { mergeProps } from '@zag-js/solid'
import { ark, type ArkComponent, type HTMLArkProps } from '../factory'
import { useProgressContext } from './progress-context'

export interface ProgressRangeProps extends HTMLArkProps<'div'> {}

export const ProgressRange: ArkComponent<'div'> = (props) => {
  const api = useProgressContext()
  const mergedProps = mergeProps(() => api().rangeProps, props)

  return <ark.div {...mergedProps} />
}
