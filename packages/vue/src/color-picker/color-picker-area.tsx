import type { ColorAreaProps } from '@zag-js/color-picker'
import { computed, defineComponent, type PropType } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import { ColorPickerAreaProvider } from './color-picker-area-context'
import { useColorPickerContext } from './color-picker-context'

export type ColorPickerAreaProps = HTMLArkProps<'div'> & ColorAreaProps

export const ColorPickerArea = defineComponent({
  name: 'ColorPickerArea',
  props: {
    xChannel: {
      type: String as PropType<ColorPickerAreaProps['xChannel']>,
      required: true,
    },
    yChannel: {
      type: String as PropType<ColorPickerAreaProps['yChannel']>,
      required: true,
    },
  },
  setup(props, { slots, attrs }) {
    const api = useColorPickerContext()
    const areaProps = computed<ColorAreaProps>(() => ({
      xChannel: props.xChannel,
      yChannel: props.yChannel,
    }))
    ColorPickerAreaProvider(areaProps)

    return () => (
      <ark.div {...api.value.getAreaProps(areaProps.value)} {...attrs}>
        {slots.default?.()}
      </ark.div>
    )
  },
})
