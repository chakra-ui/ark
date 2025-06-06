import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useAngleSliderContext } from './use-angle-slider-context'

export interface AngleSliderLabelBaseProps extends PolymorphicProps<'label'> {}
export interface AngleSliderLabelProps extends HTMLProps<'label'>, AngleSliderLabelBaseProps {}

export const AngleSliderLabel = (props: AngleSliderLabelProps) => {
  const api = useAngleSliderContext()
  const mergedProps = mergeProps(() => api().getLabelProps(), props)

  return <ark.label {...mergedProps} />
}
