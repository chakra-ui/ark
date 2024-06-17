import { mergeProps } from '@zag-js/solid'
import type { JSX } from 'solid-js'
import { type PolymorphicProps, ark } from '../factory'
import { useProgressContext } from './use-progress-context'

export interface ProgressCircleRangeBaseProps extends PolymorphicProps<'circle'> {}
export interface ProgressCircleRangeProps
  extends JSX.CircleSVGAttributes<SVGCircleElement>,
    ProgressCircleRangeBaseProps {}

export const ProgressCircleRange = (props: ProgressCircleRangeProps) => {
  const api = useProgressContext()
  const mergedProps = mergeProps(() => api().getCircleRangeProps(), props)

  return <ark.circle {...mergedProps} />
}
