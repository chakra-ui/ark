import type { TransparencyGridProps } from '@zag-js/color-picker'
import { mergeProps } from '@zag-js/react'
import { type HTMLAttributes, forwardRef } from 'react'
import { createSplitProps } from '../../utils/create-split-props'
import { type PolymorphicProps, ark } from '../factory'
import { useColorPickerContext } from './use-color-picker-context'

export interface ColorPickerTransparencyGridBaseProps
  extends TransparencyGridProps,
    PolymorphicProps {}
export interface ColorPickerTransparencyGridProps
  extends HTMLAttributes<HTMLDivElement>,
    ColorPickerTransparencyGridBaseProps {}

export const ColorPickerTransparencyGrid = forwardRef<
  HTMLDivElement,
  ColorPickerTransparencyGridProps
>((props, ref) => {
  const [gridProps, localProps] = createSplitProps<TransparencyGridProps>()(props, ['size'])
  const colorPicker = useColorPickerContext()
  const mergedProps = mergeProps(colorPicker.getTransparencyGridProps(gridProps), localProps)

  return <ark.div {...mergedProps} ref={ref} />
})

ColorPickerTransparencyGrid.displayName = 'ColorPickerTransparencyGrid'
