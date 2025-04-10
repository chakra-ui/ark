import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useAngleSliderContext } from './use-angle-slider-context'

export interface AngleSliderValueTextBaseProps extends PolymorphicProps<'div'> {}
export interface AngleSliderValueTextProps extends HTMLProps<'div'>, AngleSliderValueTextBaseProps {}

export const AngleSliderValueText = (props: AngleSliderValueTextProps) => {
  const api = useAngleSliderContext()
  const mergedProps = mergeProps(() => api().getValueTextProps(), props)

  return <ark.div {...mergedProps}>{props.children || api().valueAsDegree}</ark.div>
}
