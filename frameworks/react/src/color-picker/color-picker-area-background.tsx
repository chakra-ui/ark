import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import { useColorPickerAreaPropsContext } from './use-color-picker-area-props-context'
import { useColorPickerContext } from './use-color-picker-context'

export interface ColorPickerAreaBackgroundProps extends HTMLArkProps<'div'> {}

export const ColorPickerAreaBackground = forwardRef<HTMLDivElement, ColorPickerAreaBackgroundProps>(
  (props, ref) => {
    const colorPicker = useColorPickerContext()
    const areaProps = useColorPickerAreaPropsContext()
    const mergedProps = mergeProps(colorPicker.getAreaBackgroundProps(areaProps), props)

    return <ark.div {...mergedProps} ref={ref} />
  },
)

ColorPickerAreaBackground.displayName = 'ColorPickerAreaBackground'
