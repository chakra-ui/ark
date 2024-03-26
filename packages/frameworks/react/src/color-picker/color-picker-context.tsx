import { useColorPickerContext, type UseColorPickerContext } from './use-color-picker-context'

export interface ColorPickerContextProps {
  children: (context: UseColorPickerContext) => React.ReactNode
}

export const ColorPickerContext = (props: ColorPickerContextProps) =>
  props.children(useColorPickerContext())
