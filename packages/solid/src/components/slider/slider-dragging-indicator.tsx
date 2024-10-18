import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useSliderContext } from './use-slider-context'
import { useSliderThumbPropsContext } from './use-slider-thumb-props-context'

export interface SliderDraggingIndicatorBaseProps extends PolymorphicProps<'span'> {}
export interface SliderDraggingIndicatorProps
  extends HTMLProps<'span'>,
    SliderDraggingIndicatorBaseProps {}

export const SliderDraggingIndicator = (props: SliderDraggingIndicatorProps) => {
  const slider = useSliderContext()
  const thumbProps = useSliderThumbPropsContext()
  const mergedProps = mergeProps(() => slider().getDraggingIndicatorProps(thumbProps), props)

  return (
    <ark.span {...mergedProps}>
      {props.children || slider().getThumbValue(thumbProps.index)}
    </ark.span>
  )
}
