import { mergeProps } from '@zag-js/solid'
import { type HTMLArkProps, ark } from '../factory'
import { useSliderContext } from './use-slider-context'
import { useSliderThumbPropsContext } from './use-slider-thumb-props-context'

export interface SliderHiddenInputProps extends HTMLArkProps<'input'> {}

export const SliderHiddenInput = (props: SliderHiddenInputProps) => {
  const slider = useSliderContext()
  const thumbProps = useSliderThumbPropsContext()
  const mergedProps = mergeProps(slider().getHiddenInputProps(thumbProps), props)

  return <ark.input {...mergedProps} />
}
