import { type SwatchProps } from '@zag-js/color-picker'
import { defineComponent, type PropType } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import type { Assign } from '../types'
import { useColorPickerContext } from './color-picker-context'

export interface ColorPickerSwatchProps extends Assign<HTMLArkProps<'button'>, SwatchProps> {}

export const ColorPickerSwatch = defineComponent({
  name: 'ColorPickerSwatch',
  props: {
    readOnly: {
      type: Boolean as PropType<SwatchProps['respectAlpha']>,
      default: undefined,
    },
    value: {
      type: [String, Object] as PropType<SwatchProps['value']>,
      required: true,
    },
  },
  setup(props, { slots, attrs }) {
    const api = useColorPickerContext()

    return () => (
      <ark.button {...api.value.getSwatchProps(props)} {...attrs}>
        {slots.default?.()}
      </ark.button>
    )
  },
})
