import { defineComponent } from 'vue'
import { type HTMLArkProps, ark } from '../factory'
import { useColorPickerChannelSliderContext } from './use-color-picker-channel-slider-context'
import { useColorPickerContext } from './use-color-picker-context'

export interface ColorPickerChannelSliderThumbProps extends HTMLArkProps<'div'> {}

export const ColorPickerChannelSliderThumb = defineComponent<ColorPickerChannelSliderThumbProps>(
  (_, { slots, attrs }) => {
    const api = useColorPickerContext()
    const sliderProps = useColorPickerChannelSliderContext()

    return () => (
      <ark.div {...api.value.getChannelSliderThumbProps(sliderProps)} {...attrs}>
        {slots.default?.()}
      </ark.div>
    )
  },
  {
    name: 'ColorPickerChannelSliderThumb',
  },
)
