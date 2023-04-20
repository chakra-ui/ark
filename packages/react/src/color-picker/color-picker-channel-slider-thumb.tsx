import { forwardRef } from '@polymorphic-factory/react'
import { mergeProps } from '@zag-js/react'
import { ark, type HTMLArkProps } from '../factory'
import { useColorPickerSliderContext } from './color-picker-channel-slider-context'
import { useColorPickerContext } from './color-picker-context'

export type ColorPickerSliderThumbProps = HTMLArkProps<'div'>

export const ColorPickerSliderThumb = forwardRef<'div', ColorPickerSliderThumbProps>(
  (props, ref) => {
    const sliderContext = useColorPickerSliderContext()
    const { getChannelSliderThumbProps } = useColorPickerContext()
    const mergedProps = mergeProps(getChannelSliderThumbProps(sliderContext), props)

    return <ark.div {...mergedProps} ref={ref} />
  },
)
