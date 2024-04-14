import { mergeProps } from '@zag-js/solid'
import { Index } from 'solid-js'
import { type HTMLArkProps, ark } from '../../factory'
import { useColorPickerContext } from './use-color-picker-context'

export interface ColorPickerFormatSelectProps extends HTMLArkProps<'select'> {}

export const ColorPickerFormatSelect = (props: ColorPickerFormatSelectProps) => {
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
