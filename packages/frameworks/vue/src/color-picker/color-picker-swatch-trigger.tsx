import { type Color } from '@zag-js/color-picker'
import { defineComponent, type PropType } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import type { Assign } from '../types'
import { useColorPickerContext } from './color-picker-context'

interface SwatchTriggerProps {
  value: string | Color
}

export type ColorPickerSwatchTriggerProps = Assign<HTMLArkProps<'button'>, SwatchTriggerProps>

export const ColorPickerSwatchTrigger = defineComponent({
  name: 'ColorPickerSwatchTrigger',
  props: {
    value: {
      type: [String, Object] as PropType<SwatchTriggerProps['value']>,
      required: true,
    },
  },
  setup(props, { slots, attrs }) {
    const api = useColorPickerContext()

    return () => (
      <ark.button {...api.value.getSwatchTriggerProps(props)} {...attrs}>
        {slots.default?.()}
      </ark.button>
    )
  },
})
