import { mergeProps } from '@zag-js/solid'
import { ark, type HTMLArkProps } from '../factory'
import { useProgressContext } from './progress-context'

export interface ProgressCircleProps extends HTMLArkProps<'svg'> {}

export const ProgressCircle = (props: ProgressCircleProps) => {
  const api = useProgressContext()
  const mergedProps = mergeProps(() => api().circleProps, props)

  return <ark.svg {...mergedProps} />
}
