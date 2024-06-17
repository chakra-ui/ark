import { colorPickerAnatomy } from '@ark-ui/anatomy'
import type { ColorFormat } from '@zag-js/color-picker'
import { type HTMLAttributes, forwardRef } from 'react'
import { createSplitProps } from '../../utils/create-split-props'
import { type PolymorphicProps, ark } from '../factory'
import { useColorPickerContext } from './use-color-picker-context'
import { ColorPickerFormatPropsProvider } from './use-color-picker-format-context'

interface FormatOptions {
  format: ColorFormat
}

export interface ColorPickerViewBaseProps extends FormatOptions, PolymorphicProps {}
export interface ColorPickerViewProps
  extends HTMLAttributes<HTMLDivElement>,
    ColorPickerViewBaseProps {}

export const ColorPickerView = forwardRef<HTMLDivElement, ColorPickerViewProps>((props, ref) => {
  const colorPicker = useColorPickerContext()
  const [formatProps, restProps] = createSplitProps<FormatOptions>()(props, ['format'])

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
