import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import { useSliderContext } from './use-slider-context'

export interface SliderValueTextProps extends HTMLArkProps<'span'> {}

export const SliderValueText = forwardRef<HTMLDivElement, SliderValueTextProps>((props, ref) => {
  const { children, ...rest } = props
  const context = useSliderContext()
  const mergedProps = mergeProps(context.valueTextProps, rest)

  return (
    <ark.span {...mergedProps} ref={ref}>
      {children || context.value.join(', ')}
    </ark.span>
  )
})

SliderValueText.displayName = 'SliderValueText'
