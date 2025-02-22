import type { ReactNode } from 'react'
import { type UseColorPickerContext, useColorPickerContext } from './use-color-picker-context'

export interface ColorPickerContextProps {
  children: (context: UseColorPickerContext) => ReactNode
}

export const ColorPickerContext = (props: ColorPickerContextProps) => props.children(useColorPickerContext())
