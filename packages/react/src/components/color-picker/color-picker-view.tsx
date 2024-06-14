import { colorPickerAnatomy } from '@ark-ui/anatomy'
import type { ColorFormat } from '@zag-js/color-picker'
import { forwardRef } from 'react'
import { createSplitProps } from '../../utils/create-split-props'
import { type HTMLArkProps, ark } from '../factory'
import { useColorPickerContext } from './use-color-picker-context'
import { ColorPickerFormatPropsProvider } from './use-color-picker-format-context'

export interface ColorPickerViewBaseProps {
  format: ColorFormat
}

export interface ColorPickerViewProps extends HTMLArkProps<'div'>, ColorPickerViewBaseProps {}

export const ColorPickerView = forwardRef<HTMLDivElement, ColorPickerViewProps>((props, ref) => {
  const colorPicker = useColorPickerContext()
  const [formatProps, restProps] = createSplitProps<ColorPickerViewBaseProps>()(props, ['format'])

  if (colorPicker.format !== formatProps.format) {
    return null
  }

  return (
    <ColorPickerFormatPropsProvider value={formatProps}>
      <ark.div
        ref={ref}
        data-format={props.format}
        {...colorPickerAnatomy.build().view.attrs}
        {...restProps}
      />
    </ColorPickerFormatPropsProvider>
  )
})

ColorPickerView.displayName = 'ColorPickerView'
