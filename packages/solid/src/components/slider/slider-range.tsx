import { mergeProps } from '@zag-js/solid'
import type { JSX } from 'solid-js'
import { type PolymorphicProps, ark } from '../factory'
import { useSliderContext } from './use-slider-context'

export interface SliderRangeBaseProps extends PolymorphicProps<'div'> {}
export interface SliderRangeProps
  extends JSX.HTMLAttributes<HTMLDivElement>,
    SliderRangeBaseProps {}

export const SliderRange = (props: SliderRangeProps) => {
  const api = useSliderContext()
  const mergedProps = mergeProps(() => api().getRangeProps(), props)

  return <ark.div {...mergedProps} />
}
