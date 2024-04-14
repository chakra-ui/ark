import type { AreaProps } from '@zag-js/color-picker'
import { type PropType, computed, defineComponent } from 'vue'
import { type HTMLArkProps, ark } from '../../factory'
import type { Assign } from '../../types'
import { ColorPickerAreaProvider } from './color-picker-area-context'
import { useColorPickerContext } from './color-picker-context'

export interface ColorPickerAreaProps extends Assign<HTMLArkProps<'div'>, AreaProps> {}

export const ColorPickerArea = defineComponent<ColorPickerAreaProps>(
  (props, { slots, attrs }) => {
    const api = useColorPickerContext()
    const areaProps = computed<AreaProps>(() => ({
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
  {
    name: 'ColorPickerArea',
    props: {
      xChannel: {
        type: String as PropType<ColorPickerAreaProps['xChannel']>,
      },
      yChannel: {
        type: String as PropType<ColorPickerAreaProps['yChannel']>,
      },
    },
  },
)
