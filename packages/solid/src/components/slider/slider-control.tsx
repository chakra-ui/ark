import { mergeProps } from '@zag-js/solid'
import type { JSX } from 'solid-js'
import { type PolymorphicProps, ark } from '../factory'
import { useSliderContext } from './use-slider-context'

export interface SliderControlBaseProps extends PolymorphicProps<'div'> {}
export interface SliderControlProps
  extends JSX.HTMLAttributes<HTMLDivElement>,
    SliderControlBaseProps {}

export const SliderControl = (props: SliderControlProps) => {
  const api = useSliderContext()
  const mergedProps = mergeProps(() => api().getControlProps(), props)

  return <ark.div {...mergedProps} />
}
