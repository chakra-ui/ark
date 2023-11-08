import type { ColorFormat } from '@zag-js/color-picker'
import { type PropsWithChildren } from 'react'
import { useColorPickerContext } from './color-picker-context'

export interface ColorPickerViewProps extends PropsWithChildren {
  format: ColorFormat
}

export const ColorPickerView = (props: ColorPickerViewProps) => {
  const api = useColorPickerContext()

  // TODO @segunadebayo
  return api.format === props.format ? <>{props.children}</> : null
}
