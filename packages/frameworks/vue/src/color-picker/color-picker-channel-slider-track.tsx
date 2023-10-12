import { defineComponent } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import { useColorPickerChannelSliderContext } from './color-picker-channel-slider-context'
import { useColorPickerContext } from './color-picker-context'

export type ColorPickerChannelSliderTrackProps = HTMLArkProps<'div'>

export const ColorPickerChannelSliderTrack = defineComponent({
  name: 'ColorPickerChannelSliderTrack',
  setup(_, { slots, attrs }) {
    const api = useColorPickerContext()
    const sliderProps = useColorPickerChannelSliderContext()

    return () => (
      <ark.div {...api.value.getChannelSliderTrackProps(sliderProps.value)} {...attrs}>
        {slots.default?.()}
      </ark.div>
    )
  },
})
