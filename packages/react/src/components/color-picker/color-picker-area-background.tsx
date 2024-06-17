import { mergeProps } from '@zag-js/react'
import { type HTMLAttributes, forwardRef } from 'react'
import { type PolymorphicProps, ark } from '../factory'
import { useColorPickerAreaPropsContext } from './use-color-picker-area-props-context'
import { useColorPickerContext } from './use-color-picker-context'

export interface ColorPickerAreaBackgroundBaseProps extends PolymorphicProps {}
export interface ColorPickerAreaBackgroundProps
  extends HTMLAttributes<HTMLDivElement>,
    ColorPickerAreaBackgroundBaseProps {}

export const ColorPickerAreaBackground = forwardRef<HTMLDivElement, ColorPickerAreaBackgroundProps>(
  (props, ref) => {
    const colorPicker = useColorPickerContext()
    const areaProps = useColorPickerAreaPropsContext()
    const mergedProps = mergeProps(colorPicker.getAreaBackgroundProps(areaProps), props)

    return <ark.div {...mergedProps} ref={ref} />
  },
)

ColorPickerAreaBackground.displayName = 'ColorPickerAreaBackground'
