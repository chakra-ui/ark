import type { ChannelProps } from '@zag-js/color-picker'
import { defineComponent, toRefs, type PropType } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import { ColorPickerChannelSliderProvider } from './color-picker-channel-slider-context'
import { useColorPickerContext } from './color-picker-context'

export type ColorPickerChannelSliderProps = HTMLArkProps<'div'> & ChannelProps

export const ColorPickerChannelSlider = defineComponent({
  name: 'ColorPickerChannelSlider',
  props: {
    channel: {
      type: String as PropType<ColorPickerChannelSliderProps['channel']>,
      required: true,
    },
    orientation: {
      type: String as PropType<ColorPickerChannelSliderProps['orientation']>,
    },
  },
  setup(props, { slots, attrs }) {
    const api = useColorPickerContext()
    ColorPickerChannelSliderProvider(toRefs(props))

    return () => (
      <ark.div {...api.value.getChannelSliderProps(props)} {...attrs}>
        {slots.default?.()}
      </ark.div>
    )
  },
})
