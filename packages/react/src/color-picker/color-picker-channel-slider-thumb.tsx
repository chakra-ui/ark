import { mergeProps } from '@zag-js/react'
import { ark, type HTMLArkProps } from '../factory'
import { forwardRef } from '../forward-ref'
import { useColorPickerSliderContext } from './color-picker-channel-slider-context'
import { useColorPickerContext } from './color-picker-context'

export type ColorPickerSliderThumbProps = HTMLArkProps<'div'>

export const ColorPickerSliderThumb = forwardRef<'div'>((props, ref) => {
  const sliderContext = useColorPickerSliderContext()
  const { getChannelSliderThumbProps } = useColorPickerContext()
  const mergedProps = mergeProps(getChannelSliderThumbProps(sliderContext), props)

  return <ark.div {...mergedProps} ref={ref} />
})
