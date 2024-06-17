import { mergeProps } from '@zag-js/react'
import { type HTMLAttributes, forwardRef } from 'react'
import { type PolymorphicProps, ark } from '../factory'
import { useSliderContext } from './use-slider-context'

export interface SliderValueTextBaseProps extends PolymorphicProps {}
export interface SliderValueTextProps
  extends HTMLAttributes<HTMLSpanElement>,
    SliderValueTextBaseProps {}

export const SliderValueText = forwardRef<HTMLDivElement, SliderValueTextProps>((props, ref) => {
  const { children, ...rest } = props
  const slider = useSliderContext()
  const mergedProps = mergeProps(slider.getValueTextProps(), rest)

  return (
    <ark.span {...mergedProps} ref={ref}>
      {children || slider.value.join(', ')}
    </ark.span>
  )
})

SliderValueText.displayName = 'SliderValueText'
