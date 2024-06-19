import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useProgressContext } from './use-progress-context'

export interface ProgressCircleBaseProps extends PolymorphicProps<'svg'> {}
export interface ProgressCircleProps extends HTMLProps<'svg'>, ProgressCircleBaseProps {}

export const ProgressCircle = (props: ProgressCircleProps) => {
  const api = useProgressContext()
  const mergedProps = mergeProps(() => api().getCircleProps(), props)

  return <ark.svg {...mergedProps} />
}
