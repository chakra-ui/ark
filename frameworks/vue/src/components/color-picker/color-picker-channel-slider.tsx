import type { ChannelProps } from '@zag-js/color-picker'
import { type PropType, defineComponent, ref } from 'vue'
import type { Assign } from '../../types'
import { type HTMLArkProps, ark } from '../factory'
import { ColorPickerChannelPropsProvider } from './use-color-picker-channel-props-context'
import { useColorPickerContext } from './use-color-picker-context'

export interface ColorPickerChannelSliderProps extends Assign<HTMLArkProps<'div'>, ChannelProps> {}

export const ColorPickerChannelSlider = defineComponent<ColorPickerChannelSliderProps>(
  (props, { slots, attrs }) => {
    const api = useColorPickerContext()
    ColorPickerChannelPropsProvider(ref(props))

    return () => (
      <ark.div {...api.value.getChannelSliderProps(props)} {...attrs}>
        {slots.default?.()}
      </ark.div>
    )
  },
  {
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
  },
)
