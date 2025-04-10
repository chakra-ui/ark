import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useAngleSliderContext } from './use-angle-slider-context'

export interface AngleSliderThumbBaseProps extends PolymorphicProps<'div'> {}
export interface AngleSliderThumbProps extends HTMLProps<'div'>, AngleSliderThumbBaseProps {}

export const AngleSliderThumb = (props: AngleSliderThumbProps) => {
  const api = useAngleSliderContext()
  const mergedProps = mergeProps(() => api().getThumbProps(), props)

  return <ark.div {...mergedProps} />
}
