import type { TransparencyGridProps } from '@zag-js/color-picker'
import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import type { Assign } from '../../types'
import { createSplitProps } from '../../utils/create-split-props'
import { type HTMLArkProps, ark } from '../factory'
import { useColorPickerContext } from './use-color-picker-context'

export interface ColorPickerTransparencyGridBaseProps extends TransparencyGridProps {}
export interface ColorPickerTransparencyGridProps
  extends Assign<HTMLArkProps<'div'>, ColorPickerTransparencyGridBaseProps> {}

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
