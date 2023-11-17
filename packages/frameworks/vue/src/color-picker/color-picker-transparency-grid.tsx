import { defineComponent, type PropType } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import type { Assign } from '../types'
import { useColorPickerContext } from './color-picker-context'

interface TransparancyGridProps {
  size: string
}

export interface ColorPickerTransparencyGridProps
  extends Assign<HTMLArkProps<'div'>, TransparancyGridProps> {}

export const ColorPickerTransparencyGrid = defineComponent({
  name: 'ColorPickerTransparencyGrid',
  props: {
    size: {
      type: String as PropType<ColorPickerTransparencyGridProps['size']>,
      required: true,
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
