import { mergeProps } from '@zag-js/solid'
import { ark, type ArkComponent, type HTMLArkProps } from '../factory'
import { runIfFn } from '../run-if-fn'
import { useProgressContext } from './progress-context'

export interface ProgressValueTextProps extends HTMLArkProps<'span'> {}

export const ProgressValueText: ArkComponent<'span'> = (props: ProgressValueTextProps) => {
  const api = useProgressContext()
  const mergedProps = mergeProps(() => api().valueTextProps, props)

  const getChildren = () => runIfFn(props.children, () => api().valueAsString)

  return <ark.span {...mergedProps}>{getChildren() || api().valueAsString}</ark.span>
}
