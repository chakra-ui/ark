import { mergeProps } from '@zag-js/solid'
import type { JSX } from 'solid-js'
import { type PolymorphicProps, ark } from '../factory'
import { useSliderContext } from './use-slider-context'

export interface SliderLabelBaseProps extends PolymorphicProps<'label'> {}
export interface SliderLabelProps
  extends JSX.LabelHTMLAttributes<HTMLLabelElement>,
    SliderLabelBaseProps {}

export const SliderLabel = (props: SliderLabelProps) => {
  const api = useSliderContext()
  const mergedProps = mergeProps(() => api().getLabelProps(), props)

  return <ark.label {...mergedProps} />
}
