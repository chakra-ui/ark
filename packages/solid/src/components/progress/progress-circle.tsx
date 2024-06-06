import { mergeProps } from '@zag-js/solid'
import { type HTMLArkProps, ark } from '../factory'
import { useProgressContext } from './use-progress-context'

export interface ProgressCircleProps extends HTMLArkProps<'svg'> {}

export const ProgressCircle = (props: ProgressCircleProps) => {
  const api = useProgressContext()
  const mergedProps = mergeProps(() => api().getCircleProps(), props)

  return <ark.svg {...mergedProps} />
}
