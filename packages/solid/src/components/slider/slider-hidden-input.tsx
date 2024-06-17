import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useSliderContext } from './use-slider-context'
import { useSliderThumbPropsContext } from './use-slider-thumb-props-context'

export interface SliderHiddenInputBaseProps extends PolymorphicProps<'input'> {}
export interface SliderHiddenInputProps extends HTMLProps<'input'>, SliderHiddenInputBaseProps {}

export const SliderHiddenInput = (props: SliderHiddenInputProps) => {
  const slider = useSliderContext()
  const thumbProps = useSliderThumbPropsContext()
  const mergedProps = mergeProps(slider().getHiddenInputProps(thumbProps), props)

  return <ark.input {...mergedProps} />
}
