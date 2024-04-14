import { mergeProps } from '@zag-js/solid'
import { type HTMLArkProps, ark } from '../../factory'
import { useProgressContext } from './use-progress-context'

export interface ProgressValueTextProps extends HTMLArkProps<'span'> {}

export const ProgressValueText = (props: ProgressValueTextProps) => {
  const api = useProgressContext()
  const mergedProps = mergeProps(() => api().valueTextProps, props)

  return <ark.span {...mergedProps}>{props.children || api().valueAsString}</ark.span>
}
