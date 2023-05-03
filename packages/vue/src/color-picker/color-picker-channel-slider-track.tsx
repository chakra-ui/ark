import type { ColorChannelProps } from '@zag-js/color-picker'
import { computed, defineComponent, type PropType } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import type { ComponentWithProps } from '../utils'
import { ColorPickerSliderProvider } from './color-picker-channel-slider-context'
import { useColorPickerContext } from './color-picker-context'

export type ColorPickerSliderTrackProps = HTMLArkProps<'div'> & ColorChannelProps

export const ColorPickerSliderTrack: ComponentWithProps<ColorPickerSliderTrackProps> =
  defineComponent({
    name: 'ColorPickerSliderTrack',
    props: {
      channel: {
        type: String as PropType<ColorPickerSliderTrackProps['channel']>,
        required: true,
      },
      orientation: {
        type: String as PropType<ColorPickerSliderTrackProps['orientation']>,
      },
    },
    setup(props, { slots, attrs }) {
      const channelProps = computed<ColorChannelProps>(() => ({
        channel: props.channel,
        orientation: props.orientation,
      }))

      const api = useColorPickerContext()

      ColorPickerSliderProvider(channelProps)

      return () => (
        <ark.div {...api.value.getChannelSliderTrackProps(channelProps.value)} {...attrs}>
          <ark.div {...api.value.getChannelSliderBackgroundProps(channelProps.value)} />
          {slots.default?.()}
        </ark.div>
      )
    },
  })
