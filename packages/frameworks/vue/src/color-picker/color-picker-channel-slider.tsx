import type { ChannelProps } from '@zag-js/color-picker'
import { computed, defineComponent, type PropType } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import type { Assign } from '../types'
import { ColorPickerChannelSliderProvider } from './color-picker-channel-slider-context'
import { useColorPickerContext } from './color-picker-context'

export interface ColorPickerChannelSliderProps extends Assign<HTMLArkProps<'div'>, ChannelProps> {}

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
    const channelProps = computed<ChannelProps>(() => ({
      channel: props.channel,
      orientation: props.orientation,
    }))

    const api = useColorPickerContext()
    ColorPickerChannelSliderProvider(channelProps)

    return () => (
      <ark.div {...api.value.getChannelSliderProps(channelProps.value)} {...attrs}>
        {slots.default?.()}
      </ark.div>
    )
  },
})
