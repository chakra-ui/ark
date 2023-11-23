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
  setup(props, { attrs }) {
    const api = useColorPickerContext()

    const channelProps = computed(() => ({
      channel: props.channel,
      orientation: props.orientation,
    }))

    try {
      console.log('channel input', api.value)
      console.log('try', api.value.getChannelInputProps(channelProps.value))
    } catch (error) {
      /* empty */
    }

    const inputProps = computed(() => ({
      ...api.value.getChannelInputProps(channelProps.value),
      modelValue: api.value.value,
    }))

    console.log('input props', { ...inputProps.value })

    // return () => <ark.input {...inputProps.value} {...attrs} />
    return () => <ark.input placeholder="testttt" {...attrs} />
  },
})
