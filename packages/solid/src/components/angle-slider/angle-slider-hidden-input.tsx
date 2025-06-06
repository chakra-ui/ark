import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useAngleSliderContext } from './use-angle-slider-context'

export interface AngleSliderHiddenInputBaseProps extends PolymorphicProps<'input'> {}
export interface AngleSliderHiddenInputProps extends HTMLProps<'input'>, AngleSliderHiddenInputBaseProps {}

export const AngleSliderHiddenInput = (props: AngleSliderHiddenInputProps) => {
  const api = useAngleSliderContext()
  const mergedProps = mergeProps(() => api().getHiddenInputProps(), props)

  return <ark.input {...mergedProps} />
}
