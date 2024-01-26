import { mergeProps } from '@zag-js/solid'
import { Index } from 'solid-js'
import { ark, type ArkComponent, type HTMLArkProps } from '../factory'
import { useColorPickerContext } from './color-picker-context'

export interface ColorPickerFormatSelectProps extends HTMLArkProps<'select'> {}

export const ColorPickerFormatSelect: ArkComponent<'select'> = (
  props: ColorPickerFormatSelectProps,
) => {
  const api = useColorPickerContext()
  const mergedProps = mergeProps(() => api().formatSelectProps, props)

  return (
    <ark.select {...mergedProps}>
      <Index each={['rgba', 'hsla', 'hsba']}>
        {(format) => <ark.option value={format()}>{format()}</ark.option>}
      </Index>
    </ark.select>
  )
}
