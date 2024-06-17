import { mergeProps } from '@zag-js/solid'
import type { JSX } from 'solid-js'
import { type PolymorphicProps, ark } from '../factory'
import { useSliderContext } from './use-slider-context'

export interface SliderValueTextBaseProps extends PolymorphicProps<'span'> {}
export interface SliderValueTextProps
  extends JSX.HTMLAttributes<HTMLSpanElement>,
    SliderValueTextBaseProps {}

export const SliderValueText = (props: SliderValueTextProps) => {
  const api = useSliderContext()
  const mergedProps = mergeProps(() => api().getValueTextProps(), props)

  return <ark.span {...mergedProps}>{props.children || api().value.join(',')}</ark.span>
}
