import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.tsx'
import { useAngleSliderContext } from './use-angle-slider-context.ts'

export interface AngleSliderValueTextBaseProps extends PolymorphicProps<'span'> {}
export interface AngleSliderValueTextProps extends HTMLProps<'span'>, AngleSliderValueTextBaseProps {}

export const AngleSliderValueText = (props: AngleSliderValueTextProps) => {
  const api = useAngleSliderContext()
  const mergedProps = mergeProps(() => api().getValueTextProps(), props)

  return <ark.span {...mergedProps}>{props.children || api().valueAsDegree}</ark.span>
}
