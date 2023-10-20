import { defineComponent } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import { useColorPickerContext } from './color-picker-context'

export type ColorPickerTriggerProps = HTMLArkProps<'button'>

export const ColorPickerTrigger = defineComponent({
  name: 'ColorPickerTrigger',
  setup(_, { slots, attrs }) {
    const api = useColorPickerContext()

    return () => (
      <ark.button {...api.value.triggerProps} {...attrs}>
        {slots.default?.()}
      </ark.button>
    )
  },
})
