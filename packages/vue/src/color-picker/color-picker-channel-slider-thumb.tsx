import { defineComponent } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import type { ComponentWithProps } from '../utils'
import { useColorPickerSliderContext } from './color-picker-channel-slider-context'
import { useColorPickerContext } from './color-picker-context'

export type ColorPickerSliderThumbProps = HTMLArkProps<'div'>

export const ColorPickerSliderThumb: ComponentWithProps<ColorPickerSliderThumbProps> =
  defineComponent({
    name: 'ColorPickerSliderThumb',
    setup(_, { slots, attrs }) {
      const sliderContext = useColorPickerSliderContext()

      const rootContext = useColorPickerContext()

      return () => (
        <ark.div {...rootContext.value.getChannelSliderThumbProps(sliderContext.value)} {...attrs}>
          {slots.default?.()}
        </ark.div>
      )
    },
  })
