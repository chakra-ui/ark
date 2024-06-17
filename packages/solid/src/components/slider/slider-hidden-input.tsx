import { mergeProps } from '@zag-js/solid'
import type { JSX } from 'solid-js'
import { type PolymorphicProps, ark } from '../factory'
import { useSliderContext } from './use-slider-context'
import { useSliderThumbPropsContext } from './use-slider-thumb-props-context'

export interface SliderHiddenInputBaseProps extends PolymorphicProps<'input'> {}
export interface SliderHiddenInputProps
  extends JSX.InputHTMLAttributes<HTMLInputElement>,
    SliderHiddenInputBaseProps {}

export const SliderHiddenInput = (props: SliderHiddenInputProps) => {
  const slider = useSliderContext()
  const thumbProps = useSliderThumbPropsContext()
  const mergedProps = mergeProps(slider().getHiddenInputProps(thumbProps), props)

  return <ark.input {...mergedProps} />
}
