import type { TransparencyGridProps } from '@zag-js/color-picker'
import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { createSplitProps } from '../../utils/create-split-props'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useColorPickerContext } from './use-color-picker-context'

export interface ColorPickerTransparencyGridBaseProps extends TransparencyGridProps, PolymorphicProps {}
export interface ColorPickerTransparencyGridProps extends HTMLProps<'div'>, ColorPickerTransparencyGridBaseProps {}

const splitTransparencyGridProps = createSplitProps<TransparencyGridProps>()

export const ColorPickerTransparencyGrid = forwardRef<HTMLDivElement, ColorPickerTransparencyGridProps>(
  (props, ref) => {
    const [gridProps, localProps] = splitTransparencyGridProps(props, ['size'])
    const colorPicker = useColorPickerContext()
    const mergedProps = mergeProps(colorPicker.getTransparencyGridProps(gridProps), localProps)

    return <ark.div {...mergedProps} ref={ref} />
  },
)

ColorPickerTransparencyGrid.displayName = 'ColorPickerTransparencyGrid'
