import type { ChannelInputProps } from '@zag-js/color-picker'
import { computed, defineComponent, type PropType } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import type { Assign } from '../types'
import { useColorPickerContext } from './color-picker-context'

export interface ColorPickerChannelInputProps
  extends Assign<HTMLArkProps<'input'>, ChannelInputProps> {}

export const ColorPickerChannelInput = defineComponent({
  name: 'ColorPickerChannelInput',
  props: {
    channel: {
      type: String as PropType<ChannelInputProps['channel']>,
      required: true,
    },
    orientation: {
      type: String as PropType<ChannelInputProps['orientation']>,
    },
  },
  setup(props, { slots, attrs }) {
    const api = useColorPickerContext()

    const channelProps = computed(() => ({
      channel: props.channel,
      orientation: props.orientation,
    }))

    return () => (
      <ark.input {...api.value.getChannelInputProps(channelProps.value)} {...attrs}>
        {slots.default?.()}
      </ark.input>
    )
  },
})
