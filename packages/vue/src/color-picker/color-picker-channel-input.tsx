import type { ColorChannelInputProps } from '@zag-js/color-picker/dist/color-picker.types'
import { computed, defineComponent, reactive, type PropType } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import type { ComponentWithProps } from '../utils'
import { useColorPickerContext } from './color-picker-context'

export type ColorPickerChannelInputProps = HTMLArkProps<'input'> & ColorChannelInputProps

export const ColorPickerChannelInput: ComponentWithProps<ColorPickerChannelInputProps> =
  defineComponent({
    name: 'ColorPickerChannelInput',
    props: {
      channel: {
        type: String as PropType<ColorPickerChannelInputProps['channel']>,
        required: true,
      },
      orientation: {
        type: String as PropType<ColorPickerChannelInputProps['orientation']>,
      },
    },
    setup(props, { attrs }) {
      const channelProps = reactive<ColorChannelInputProps>({
        channel: props.channel,
        orientation: props.orientation,
      })

      const api = useColorPickerContext()

      const inputProps = computed(() => ({
        ...api.value.getChannelInputProps(channelProps),
        modelValue: api.value.value,
      }))

      return () => <ark.input {...inputProps.value} {...attrs} />
    },
  })
