import { mergeProps } from '@zag-js/react'
import { ark, type HTMLArkProps } from '../factory'
import { forwardRef } from '../forward-ref'
import { useColorPickerChannelSliderContext } from './color-picker-channel-slider-context'
import { useColorPickerContext } from './color-picker-context'

export type ColorPickerChannelSliderThumbProps = HTMLArkProps<'div'>

export const ColorPickerChannelSliderThumb = forwardRef<'div'>((props, ref) => {
  const sliderContext = useColorPickerChannelSliderContext()
  const { getChannelSliderThumbProps } = useColorPickerContext()
  const mergedProps = mergeProps(getChannelSliderThumbProps(sliderContext), props)

  return <ark.div {...mergedProps} ref={ref} />
})
