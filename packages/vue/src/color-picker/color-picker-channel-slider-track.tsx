import type { ColorChannelProps } from '@zag-js/color-picker'
import { computed, defineComponent, type PropType } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import type { ComponentWithProps } from '../utils'
import { ColorPickerChannelSliderProvider } from './color-picker-channel-slider-context'
import { useColorPickerContext } from './color-picker-context'

export type ColorPickerChannelSliderTrackProps = HTMLArkProps<'div'> & ColorChannelProps

export const ColorPickerChannelSliderTrack: ComponentWithProps<ColorPickerChannelSliderTrackProps> =
  defineComponent({
    name: 'ColorPickerChannelSliderTrack',
    props: {
      channel: {
        type: String as PropType<ColorPickerChannelSliderTrackProps['channel']>,
        required: true,
      },
      orientation: {
        type: String as PropType<ColorPickerChannelSliderTrackProps['orientation']>,
      },
    },
    setup(props, { slots, attrs }) {
      const channelProps = computed<ColorChannelProps>(() => ({
        channel: props.channel,
        orientation: props.orientation,
      }))

      const api = useColorPickerContext()

      ColorPickerChannelSliderProvider(channelProps)

      return () => (
        <ark.div {...api.value.getChannelSliderTrackProps(channelProps.value)} {...attrs}>
          <ark.div {...api.value.getChannelSliderBackgroundProps(channelProps.value)} />
          {slots.default?.()}
        </ark.div>
      )
    },
  })
