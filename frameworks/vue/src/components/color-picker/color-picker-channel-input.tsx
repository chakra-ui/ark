import type { ChannelInputProps } from '@zag-js/color-picker'
import { type PropType, computed, defineComponent } from 'vue'
import { type HTMLArkProps, ark } from '~/factory'
import type { Assign } from '~/types'
import { useColorPickerContext } from './color-picker-context'

export interface ColorPickerChannelInputProps
  extends Assign<HTMLArkProps<'input'>, ChannelInputProps> {}

export const ColorPickerChannelInput = defineComponent<ColorPickerChannelInputProps>(
  (props, { slots, attrs }) => {
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
  {
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
  },
)
