import { mergeProps } from '@zag-js/solid'
import { ark, type ArkComponent, type HTMLArkProps } from '../factory'
import { useProgressContext } from './progress-context'

export interface ProgressCircleProps extends HTMLArkProps<'svg'> {}

export const ProgressCircle: ArkComponent<'svg'> = (props) => {
  const api = useProgressContext()
  const mergedProps = mergeProps(() => api().circleProps, props)

  return <ark.svg {...mergedProps} />
}
