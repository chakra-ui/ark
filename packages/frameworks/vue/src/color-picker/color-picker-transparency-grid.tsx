import type { TransparencyGridProps } from '@zag-js/color-picker'
import { defineComponent, type PropType } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import type { Assign } from '../types'
import { useColorPickerContext } from './color-picker-context'

export interface ColorPickerTransparencyGridProps
  extends Assign<HTMLArkProps<'div'>, TransparencyGridProps> {}

export const ColorPickerTransparencyGrid = defineComponent({
  name: 'ColorPickerTransparencyGrid',
  props: {
    size: {
      type: String as PropType<ColorPickerTransparencyGridProps['size']>,
    },
  },
  setup(props, { slots, attrs }) {
    const api = useColorPickerContext()

    return () => (
      <ark.div {...api.value.getTransparencyGridProps(props)} {...attrs}>
        {slots.default?.()}
      </ark.div>
    )
  },
})
