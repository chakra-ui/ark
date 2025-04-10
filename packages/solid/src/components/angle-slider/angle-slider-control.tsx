import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useAngleSliderContext } from './use-angle-slider-context'

export interface AngleSliderControlBaseProps extends PolymorphicProps<'div'> {}
export interface AngleSliderControlProps extends HTMLProps<'div'>, AngleSliderControlBaseProps {}

export const AngleSliderControl = (props: AngleSliderControlProps) => {
  const api = useAngleSliderContext()
  const mergedProps = mergeProps(() => api().getControlProps(), props)

  return <ark.div {...mergedProps} />
}
