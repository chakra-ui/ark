import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useColorPickerAreaPropsContext } from './use-color-picker-area-props-context'
import { useColorPickerContext } from './use-color-picker-context'

export interface ColorPickerAreaThumbBaseProps extends PolymorphicProps {}
export interface ColorPickerAreaThumbProps
  extends HTMLProps<'div'>,
    ColorPickerAreaThumbBaseProps {}

export const ColorPickerAreaThumb = forwardRef<HTMLDivElement, ColorPickerAreaThumbProps>(
  (props, ref) => {
    const colorPicker = useColorPickerContext()
    const areaProps = useColorPickerAreaPropsContext()
    const mergedProps = mergeProps(colorPicker.getAreaThumbProps(areaProps), props)

    return <ark.div {...mergedProps} ref={ref} />
  },
)

ColorPickerAreaThumb.displayName = 'ColorPickerAreaThumb'
