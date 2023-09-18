import { defineComponent } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import { useColorPickerChannelSliderContext } from './color-picker-channel-slider-context'
import { useColorPickerContext } from './color-picker-context'

export type ColorPickerChannelSliderBackgroundProps = HTMLArkProps<'div'>

export const ColorPickerChannelSliderBackground = defineComponent({
  name: 'ColorPickerChannelSliderBackground',
  setup(_, { slots, attrs }) {
    const api = useColorPickerContext()
    const sliderProps = useColorPickerChannelSliderContext()

    return () => (
      <ark.div {...api.value.getChannelSliderBackgroundProps(sliderProps.value)} {...attrs}>
        {slots.default?.()}
      </ark.div>
    )
  },
})
