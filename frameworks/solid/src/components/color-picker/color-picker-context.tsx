import type { JSX } from 'solid-js'
import { type UseColorPickerContext, useColorPickerContext } from './use-color-picker-context'

export interface ColorPickerContextProps {
  children: (context: UseColorPickerContext) => JSX.Element
}

export const ColorPickerContext = (props: ColorPickerContextProps) =>
  props.children(useColorPickerContext())
