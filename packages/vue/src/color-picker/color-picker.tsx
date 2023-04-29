import { defineComponent, type PropType } from 'vue'
import type { ComponentWithProps } from '../utils'
import { ColorPickerProvider } from './color-picker-context'
import { useColorPicker, type UseColorPickerContext } from './use-color-picker'

export type ColorPickerProps = UseColorPickerContext

export const ColorPicker: ComponentWithProps<ColorPickerProps> = defineComponent({
  name: 'ColorPicker',
  props: {
    dir: {
      type: String as PropType<ColorPickerProps['dir']>,
    },
    id: {
      type: String as PropType<ColorPickerProps['id']>,
    },
    getRootNode: {
      type: Function as PropType<ColorPickerProps['getRootNode']>,
    },
    modelValue: {
      type: String as PropType<ColorPickerProps['modelValue']>,
    },
    value: {
      type: String as PropType<ColorPickerProps['value']>,
    },
    disabled: {
      type: Boolean as PropType<ColorPickerProps['disabled']>,
    },
    readOnly: {
      type: Boolean as PropType<ColorPickerProps['readOnly']>,
    },
  },
  emits: ['change', 'change-end', 'update:modelValue'],
  setup(props, { slots, emit }) {
    const api = useColorPicker(emit, props)

    ColorPickerProvider(api)

    return () => slots.default?.({ ...api.value })
  },
})
