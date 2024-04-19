import { defineComponent } from 'vue'
import { type HTMLArkProps, ark } from '../factory'
import { useColorPickerChannelPropsContext } from './use-color-picker-channel-props-context'
import { useColorPickerContext } from './use-color-picker-context'

export interface ColorPickerChannelSliderThumbProps extends HTMLArkProps<'div'> {}

export const ColorPickerChannelSliderThumb = defineComponent<ColorPickerChannelSliderThumbProps>(
  (_, { slots, attrs }) => {
    const api = useColorPickerContext()
    const channelProps = useColorPickerChannelPropsContext()

    return () => (
      <ark.div {...api.value.getChannelSliderThumbProps(channelProps.value)} {...attrs}>
        {slots.default?.()}
      </ark.div>
    )
  },
  {
    name: 'ColorPickerChannelSliderThumb',
  },
)
