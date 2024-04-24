import type { TransparencyGridProps } from '@zag-js/color-picker'
import { type PropType, defineComponent } from 'vue'
import type { Assign } from '../../types'
import { type HTMLArkProps, ark } from '../factory'
import { useColorPickerContext } from './use-color-picker-context'

export interface ColorPickerTransparencyGridProps
  extends Assign<HTMLArkProps<'div'>, TransparencyGridProps> {}

export const ColorPickerTransparencyGrid = defineComponent<ColorPickerTransparencyGridProps>(
  (props, { slots, attrs }) => {
    const api = useColorPickerContext()

    return () => (
      <ark.div {...api.value.getTransparencyGridProps(props)} {...attrs}>
        {slots.default?.()}
      </ark.div>
    )
  },
  {
    name: 'ColorPickerTransparencyGrid',
    props: {
      size: {
        type: String as PropType<ColorPickerTransparencyGridProps['size']>,
      },
    },
  },
)
