import { type Context } from '@zag-js/color-picker'
import { defineComponent, type PropType } from 'vue'
import type { HTMLArkProps } from '../factory'
import type { Assign } from '../types'
import { createVueProps, type ComponentWithProps } from '../utils'
import { ColorPickerProvider } from './color-picker-context'
import { useColorPicker } from './use-color-picker'

export type ColorPickerContext = Context & {
  modelValue?: Context['value']
}
export type ColorPickerProps = Assign<HTMLArkProps<'div'>, ColorPickerContext>

const VueColorPickerProps = createVueProps<ColorPickerProps>({
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
})

export const ColorPicker: ComponentWithProps<Partial<ColorPickerContext>> = defineComponent({
  name: 'ColorPicker',
  props: VueColorPickerProps,
  emits: ['change', 'change-end', 'update:modelValue'],
  setup(props, { slots, emit }) {
    const api = useColorPicker(emit, props)

    ColorPickerProvider(api)

    return () => slots.default?.(api.value)
  },
})
