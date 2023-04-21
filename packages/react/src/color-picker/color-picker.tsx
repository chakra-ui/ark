import { type PropsWithChildren, type ReactNode } from 'react'
import { runIfFn } from '../run-if-fn'
import { type Assign } from '../types'
import { ColorPickerProvider, type ColorPickerContext } from './color-picker-context'
import { useColorPicker, type UseColorPickerProps } from './use-color-picker'

export type ColorPickerProps = Assign<
  PropsWithChildren<UseColorPickerProps>,
  {
    children?: ReactNode | ((props: ColorPickerContext) => ReactNode)
  }
>

export const ColorPicker = (props: ColorPickerProps) => {
  const { children, ...useColorPickerProps } = props
  const datePicker = useColorPicker(useColorPickerProps)
  const view = runIfFn(children, datePicker)

  return <ColorPickerProvider value={datePicker}>{view}</ColorPickerProvider>
}
