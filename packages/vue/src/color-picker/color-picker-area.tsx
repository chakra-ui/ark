import type { AreaProps } from '@zag-js/color-picker/dist/color-picker.types'
import { computed, defineComponent, type PropType } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import type { ComponentWithProps } from '../utils'
import { ColorPickerAreaProvider } from './color-picker-area-context'
import { useColorPickerContext } from './color-picker-context'

export type ColorPickerAreaProps = HTMLArkProps<'div'> & AreaProps

export const ColorPickerArea: ComponentWithProps<ColorPickerAreaProps> = defineComponent({
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
    const areaProps = computed<AreaProps>(() => ({
      xChannel: props.xChannel,
      yChannel: props.yChannel,
    }))

    const rootContext = useColorPickerContext()

    ColorPickerAreaProvider(areaProps)

    return () => (
      <ark.div {...rootContext.value.getAreaProps(areaProps.value)} {...attrs}>
        {slots.default?.()}
      </ark.div>
    )
  },
})
