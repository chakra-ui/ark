import { colorPickerAnatomy } from '@ark-ui/anatomy'
import type { ColorFormat } from '@zag-js/color-picker'
import { mergeProps } from '@zag-js/solid'
import { Show, type JSX } from 'solid-js'
import { ark } from '../factory'
import { useColorPickerContext } from './color-picker-context'

export interface ColorPickerViewProps {
  format: ColorFormat
  children?: JSX.Element
}

export const ColorPickerView = (props: ColorPickerViewProps) => {
  const api = useColorPickerContext()
  const mergedProps = mergeProps(() => colorPickerAnatomy.build().view.attrs, props)

  // TODO @segunadebayo
  return (
    <Show when={api().format === props.format}>
      <ark.div data-format={props.format} {...mergedProps} />
    </Show>
  )
}
