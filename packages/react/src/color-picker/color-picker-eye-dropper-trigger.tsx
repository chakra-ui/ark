import { Children, cloneElement, type ReactElement } from 'react'
import { useColorPickerContext } from './color-picker-context'

export type ColorPickerEyeDropperTriggerProps = { children: ReactElement }

export const ColorPickerEyeDropperTrigger = (props: ColorPickerEyeDropperTriggerProps) => {
  const { eyeDropperTriggerProps } = useColorPickerContext()

  const onlyChild = Children.only(props.children)
  return cloneElement(onlyChild, eyeDropperTriggerProps)
}
