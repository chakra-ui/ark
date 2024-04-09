import type { ReactNode } from 'react'
import { useColorPickerContext, type UseColorPickerContext } from './use-color-picker-context'

export interface ColorPickerContextProps {
  children: (context: UseColorPickerContext) => ReactNode
}

export const ColorPickerContext = (props: ColorPickerContextProps) =>
  props.children(useColorPickerContext())
