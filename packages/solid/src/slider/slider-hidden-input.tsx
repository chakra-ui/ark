import { mergeProps } from '@zag-js/solid'
import { ark, type HTMLArkProps } from '../factory'
import { useSliderContext } from './slider-context'

export type SliderHiddenInputProps = HTMLArkProps<'input'>

export const SliderHiddenInput = (props: SliderHiddenInputProps) => {
  const api = useSliderContext()
  const mergedProps = mergeProps(() => api().hiddenInputProps, props)

  return <ark.input {...mergedProps} />
}
