import { defineComponent, type PropType } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import { useColorPickerContext } from './color-picker-context'

interface TransparencyGridProps {
  size: string
}

export type ColorPickerTransparencyGridProps = HTMLArkProps<'div'> & TransparencyGridProps

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
