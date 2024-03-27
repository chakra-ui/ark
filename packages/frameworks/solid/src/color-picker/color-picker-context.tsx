import type { JSX } from 'solid-js'
import { useColorPickerContext, type UseColorPickerContext } from './use-color-picker-context'

export interface ColorPickerContextProps {
  children: (context: UseColorPickerContext) => JSX.Element
}

export const ColorPickerContext = (props: ColorPickerContextProps) =>
  props.children(useColorPickerContext())
