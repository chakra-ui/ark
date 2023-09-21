import { type ReactNode } from 'react'
import { runIfFn } from '../run-if-fn'
import { type Assign } from '../types'
import { ColorPickerProvider, type ColorPickerContext } from './color-picker-context'
import { useColorPicker, type UseColorPickerProps } from './use-color-picker'

export interface ColorPickerProps
  extends Assign<
    UseColorPickerProps,
    { children?: ReactNode | ((props: ColorPickerContext) => ReactNode) }
  > {}

export const ColorPicker = (props: ColorPickerProps) => {
  const { children, ...useColorPickerProps } = props
  const api = useColorPicker(useColorPickerProps)
  const view = runIfFn(children, api)

  return <ColorPickerProvider value={api}>{view}</ColorPickerProvider>
}
