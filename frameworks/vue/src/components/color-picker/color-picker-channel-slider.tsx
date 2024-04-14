import type { ChannelProps } from '@zag-js/color-picker'
import { type PropType, defineComponent, reactive } from 'vue'
import type { Assign } from '../../types'
import { type HTMLArkProps, ark } from '../factory'
import { ColorPickerChannelSliderProvider } from './color-picker-channel-slider-context'
import { useColorPickerContext } from './color-picker-context'

export interface ColorPickerChannelSliderProps extends Assign<HTMLArkProps<'div'>, ChannelProps> {}

export const ColorPickerChannelSlider = defineComponent<ColorPickerChannelSliderProps>(
  (props, { slots, attrs }) => {
    const api = useColorPickerContext()
    ColorPickerChannelSliderProvider(reactive(props))

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
