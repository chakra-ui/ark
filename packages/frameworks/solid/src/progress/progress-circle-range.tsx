import { mergeProps } from '@zag-js/solid'
import { ark, type HTMLArkProps } from '../factory'
import { useProgressContext } from './progress-context'

export interface ProgressCircleRangeProps extends HTMLArkProps<'circle'> {}

export const ProgressCircleRange = (props: ProgressCircleRangeProps) => {
  const api = useProgressContext()
  const mergedProps = mergeProps(() => api().circleRangeProps, props, {
    style: {
      cx: '50px',
      cy: '50px',
      r: '42px',
    },
  })

  return <ark.circle {...mergedProps} />
}
