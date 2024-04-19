import { type SlotsType, type UnwrapRef, defineComponent } from 'vue'
import { type UseColorPickerContext, useColorPickerContext } from './use-color-picker-context'

export type ColorPickerContextProps = SlotsType<{
  default: UnwrapRef<UseColorPickerContext>
}>

export const ColorPickerContext = defineComponent(
  (_, { slots }) => {
    const colorpicker = useColorPickerContext()

    return () => slots.default(colorpicker.value)
  },
  {
    name: 'ColorPickerContext',
    slots: Object as ColorPickerContextProps,
  },
)
