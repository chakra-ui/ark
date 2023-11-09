import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import { useSliderContext } from './slider-context'

export interface SliderValueTextProps extends HTMLArkProps<'span'> {}

export const SliderValueText = forwardRef<HTMLDivElement, SliderValueTextProps>((props, ref) => {
  const { children, ...rest } = props
  const api = useSliderContext()
  const mergedProps = mergeProps(api.valueTextProps, rest)

  return (
    <ark.span {...mergedProps} ref={ref}>
      {children || api.value.join(', ')}
    </ark.span>
  )
})

SliderValueText.displayName = 'SliderValueText'
