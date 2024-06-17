import { mergeProps } from '@zag-js/solid'
import type { JSX } from 'solid-js'
import { type PolymorphicProps, ark } from '../factory'
import { useProgressContext } from './use-progress-context'

export interface ProgressCircleBaseProps extends PolymorphicProps<'svg'> {}
export interface ProgressCircleProps
  extends JSX.SvgSVGAttributes<SVGSVGElement>,
    ProgressCircleBaseProps {}

export const ProgressCircle = (props: ProgressCircleProps) => {
  const api = useProgressContext()
  const mergedProps = mergeProps(() => api().getCircleProps(), props)

  return <ark.svg {...mergedProps} />
}
