import { type Context } from '@zag-js/color-picker'
import { defineComponent, type PropType } from 'vue'
import type { HTMLArkProps } from '../factory'
import type { Assign, Optional } from '../types'
import { createVueProps, type ComponentWithProps } from '../utils'
import { ColorPickerProvider } from './color-picker-context'
import { useColorPicker } from './use-color-picker'

export type ColorPickerContext = Context & {
  modelValue?: Context['value']
}
export type UseColorPickerProps = Assign<HTMLArkProps<'div'>, ColorPickerContext>

const VueColorPickerProps = createVueProps<UseColorPickerProps>({
  dir: {
    type: String as PropType<UseColorPickerProps['dir']>,
  },
  id: {
    type: String as PropType<UseColorPickerProps['id']>,
  },
  getRootNode: {
    type: Function as PropType<UseColorPickerProps['getRootNode']>,
  },
  modelValue: {
    type: String as PropType<UseColorPickerProps['modelValue']>,
  },
  value: {
    type: String as PropType<UseColorPickerProps['value']>,
  },
  disabled: {
    type: Boolean as PropType<UseColorPickerProps['disabled']>,
  },
  readOnly: {
    type: Boolean as PropType<UseColorPickerProps['readOnly']>,
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

export type ColorPickerProps = Optional<ColorPickerContext, 'id'>
