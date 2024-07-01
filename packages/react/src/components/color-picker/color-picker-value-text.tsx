import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useColorPickerContext } from './use-color-picker-context'

export interface ColorPickerValueTextBaseProps extends PolymorphicProps {}
export interface ColorPickerValueTextProps
  extends HTMLProps<'span'>,
    ColorPickerValueTextBaseProps {}

export const ColorPickerValueText = forwardRef<HTMLDivElement, ColorPickerValueTextProps>(
  (props, ref) => {
    const { children, ...localprops } = props
    const colorPicker = useColorPickerContext()
    const mergedProps = mergeProps(colorPicker.getValueTextProps(), localprops)

    return (
      <ark.span {...mergedProps} ref={ref}>
        {props.children || colorPicker.valueAsString}
      </ark.span>
    )
  },
)

ColorPickerValueText.displayName = 'ColorPickerValueText'
