import type { ColorFormat } from '@zag-js/color-picker'
import { Show, children, type JSX } from 'solid-js'
import { useColorPickerContext } from './color-picker-context'

export interface ColorPickerViewProps {
  format: ColorFormat
  children?: JSX.Element
}

export const ColorPickerView = (props: ColorPickerViewProps) => {
  const api = useColorPickerContext()
  const getChildren = children(() => props.children)

  // TODO @segunadebayo
  return <Show when={api().format === props.format}>{getChildren()}</Show>
}
