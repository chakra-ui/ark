import { mergeProps } from '@zag-js/react'
import { ark, type HTMLArkProps } from '../factory'
import { forwardRef } from '../forward-ref'
import { useColorPickerChannelSliderContext } from './color-picker-channel-slider-context'
import { useColorPickerContext } from './color-picker-context'

export type ColorPickerChannelSliderBackgroundProps = HTMLArkProps<'div'>

export const ColorPickerChannelSliderBackground = forwardRef<'div'>((props, ref) => {
  const sliderContext = useColorPickerChannelSliderContext()
  const { getChannelSliderBackgroundProps } = useColorPickerContext()
  const mergedProps = mergeProps(getChannelSliderBackgroundProps(sliderContext), props)

  return <ark.div {...mergedProps} ref={ref} />
})
