import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useSliderContext } from './use-slider-context'
import { useSliderThumbPropsContext } from './use-slider-thumb-props-context'

export interface SliderDraggingIndicatorBaseProps extends PolymorphicProps {}
export interface SliderDraggingIndicatorProps
  extends HTMLProps<'span'>,
    SliderDraggingIndicatorBaseProps {}

export const SliderDraggingIndicator = forwardRef<HTMLSpanElement, SliderDraggingIndicatorProps>(
  (props, ref) => {
    const slider = useSliderContext()
    const { index } = useSliderThumbPropsContext()
    const mergedProps = mergeProps(slider.getDraggingIndicatorProps({ index }), props)

    return (
      <ark.span {...mergedProps} ref={ref}>
        {props.children || slider.getThumbValue(index)}
      </ark.span>
    )
  },
)

SliderDraggingIndicator.displayName = 'SliderDraggingIndicator'
