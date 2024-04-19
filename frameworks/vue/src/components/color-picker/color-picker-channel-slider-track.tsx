import { defineComponent } from 'vue'
import { type HTMLArkProps, ark } from '../factory'
import { useColorPickerChannelPropsContext } from './use-color-picker-channel-props-context'
import { useColorPickerContext } from './use-color-picker-context'

export interface ColorPickerChannelSliderTrackProps extends HTMLArkProps<'div'> {}

export const ColorPickerChannelSliderTrack = defineComponent<ColorPickerChannelSliderTrackProps>(
  (_, { slots, attrs }) => {
    const api = useColorPickerContext()
    const channelProps = useColorPickerChannelPropsContext()

    return () => (
      <ark.div {...api.value.getChannelSliderTrackProps(channelProps.value)} {...attrs}>
        {slots.default?.()}
      </ark.div>
    )
  },
  {
    name: 'ColorPickerChannelSliderTrack',
  },
)
