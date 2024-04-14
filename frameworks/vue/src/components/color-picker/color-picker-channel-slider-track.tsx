import { defineComponent } from 'vue'
import { type HTMLArkProps, ark } from '~/factory'
import { useColorPickerChannelSliderContext } from './color-picker-channel-slider-context'
import { useColorPickerContext } from './color-picker-context'

export interface ColorPickerChannelSliderTrackProps extends HTMLArkProps<'div'> {}

export const ColorPickerChannelSliderTrack = defineComponent<ColorPickerChannelSliderTrackProps>(
  (_, { slots, attrs }) => {
    const api = useColorPickerContext()
    const sliderProps = useColorPickerChannelSliderContext()

    return () => (
      <ark.div {...api.value.getChannelSliderTrackProps(sliderProps)} {...attrs}>
        {slots.default?.()}
      </ark.div>
    )
  },
  {
    name: 'ColorPickerChannelSliderTrack',
  },
)
