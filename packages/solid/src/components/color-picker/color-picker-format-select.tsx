import { mergeProps } from '@zag-js/solid'
import type { JSX } from 'solid-js'
import { Index } from 'solid-js'
import { type PolymorphicProps, ark } from '../factory'
import { useColorPickerContext } from './use-color-picker-context'

export interface ColorPickerFormatSelectBaseProps extends PolymorphicProps<'select'> {}
export interface ColorPickerFormatSelectProps
  extends JSX.SelectHTMLAttributes<HTMLSelectElement>,
    ColorPickerFormatSelectBaseProps {}

export const ColorPickerFormatSelect = (props: ColorPickerFormatSelectProps) => {
  const api = useColorPickerContext()
  const mergedProps = mergeProps(() => api().getFormatSelectProps(), props)

  return (
    <ark.select {...mergedProps}>
      <Index each={['rgba', 'hsla', 'hsba']}>
        {(format) => <ark.option value={format()}>{format()}</ark.option>}
      </Index>
    </ark.select>
  )
}
