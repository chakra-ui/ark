import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useSliderContext } from './use-slider-context'

export interface SliderValueTextBaseProps extends PolymorphicProps {}
export interface SliderValueTextProps extends HTMLProps<'span'>, SliderValueTextBaseProps {}

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
