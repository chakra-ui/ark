import { defineComponent } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import type { ComponentWithProps } from '../utils'
import { useColorPickerChannelSliderContext } from './color-picker-channel-slider-context'
import { useColorPickerContext } from './color-picker-context'

export type ColorPickerChannelSliderThumbProps = HTMLArkProps<'div'>

export const ColorPickerChannelSliderThumb: ComponentWithProps<ColorPickerChannelSliderThumbProps> =
  defineComponent({
    name: 'ColorPickerChannelSliderThumb',
    setup(_, { slots, attrs }) {
      const sliderContext = useColorPickerChannelSliderContext()

      const rootContext = useColorPickerContext()

      return () => (
        <ark.div {...rootContext.value.getChannelSliderThumbProps(sliderContext.value)} {...attrs}>
          {slots.default?.()}
        </ark.div>
      )
    },
  })
