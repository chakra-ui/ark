import { mergeProps } from '@zag-js/solid'
import { type HTMLArkProps, ark } from '../../factory'
import { useProgressContext } from './use-progress-context'

export interface ProgressLabelProps extends HTMLArkProps<'label'> {}

export const ProgressLabel = (props: ProgressLabelProps) => {
  const api = useProgressContext()
  const mergedProps = mergeProps(() => api().labelProps, props)

  return <ark.label {...mergedProps} />
}
