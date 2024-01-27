import { mergeProps } from '@zag-js/solid'
import { ark, type ArkComponent, type HTMLArkProps } from '../factory'
import { useProgressContext } from './progress-context'

export interface ProgressCircleRangeProps extends HTMLArkProps<'circle'> {}

export const ProgressCircleRange: ArkComponent<'circle'> = (props: ProgressCircleRangeProps) => {
  const api = useProgressContext()
  const mergedProps = mergeProps(() => api().circleRangeProps, props)

  return <ark.circle {...mergedProps} />
}
