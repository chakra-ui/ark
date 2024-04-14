import { defineComponent } from 'vue'
import { type HTMLArkProps, ark } from '../../factory'
import { useColorPickerContext } from './color-picker-context'

export interface ColorPickerTriggerProps extends HTMLArkProps<'button'> {}

export const ColorPickerTrigger = defineComponent<ColorPickerTriggerProps>(
  (_, { slots, attrs }) => {
    const api = useColorPickerContext()

    return () => (
      <ark.button {...api.value.triggerProps} {...attrs}>
        {slots.default?.()}
      </ark.button>
    )
  },
  {
    name: 'ColorPickerTrigger',
  },
)
