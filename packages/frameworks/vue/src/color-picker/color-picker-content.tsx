import { defineComponent } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import { useColorPickerContext } from './color-picker-context'

export type ColorPickerContentProps = HTMLArkProps<'div'>

export const ColorPickerContent = defineComponent({
  name: 'ColorPickerContent',
  setup(_, { slots, attrs }) {
    const api = useColorPickerContext()

    return () => (
      <ark.div {...api.value.contentProps} {...attrs}>
        {slots.default?.()}
      </ark.div>
    )
  },
})
