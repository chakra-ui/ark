import { defineComponent } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import type { ComponentWithProps } from '../utils'
import { useColorPickerChannelSliderContext } from './color-picker-channel-slider-context'
import { useColorPickerContext } from './color-picker-context'

export type ColorPickerChannelSliderBackgroundProps = HTMLArkProps<'div'>

export const ColorPickerChannelSliderBackground: ComponentWithProps<ColorPickerChannelSliderBackgroundProps> =
  defineComponent({
    name: 'ColorPickerChannelSliderBackground',
    setup(_, { slots, attrs }) {
      const sliderContext = useColorPickerChannelSliderContext()

      const rootContext = useColorPickerContext()

      return () => (
        <ark.div
          {...rootContext.value.getChannelSliderBackgroundProps(sliderContext.value)}
          {...attrs}
        >
          {slots.default?.()}
        </ark.div>
      )
    },
  })
