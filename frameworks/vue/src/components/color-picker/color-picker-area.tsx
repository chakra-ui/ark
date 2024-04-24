import type { AreaProps } from '@zag-js/color-picker'
import { type PropType, defineComponent } from 'vue'
import type { Assign } from '../../types'
import { type HTMLArkProps, ark } from '../factory'
import { ColorPickerAreaPropsProvider } from './use-color-picker-area-props-context'
import { useColorPickerContext } from './use-color-picker-context'

export interface ColorPickerAreaProps extends Assign<HTMLArkProps<'div'>, AreaProps> {}

export const ColorPickerArea = defineComponent<ColorPickerAreaProps>(
  (props, { slots, attrs }) => {
    const api = useColorPickerContext()
    const areaProps = {
      xChannel: props.xChannel,
      yChannel: props.yChannel,
    }
    ColorPickerAreaPropsProvider(areaProps)

    return () => (
      <ark.div {...api.value.getAreaProps(areaProps)} {...attrs}>
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
