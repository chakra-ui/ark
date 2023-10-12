import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { createSplitProps } from '../create-split-props'
import { ark, type HTMLArkProps } from '../factory'
import type { Assign } from '../types'
import { useColorPickerContext } from './color-picker-context'

interface TransparancyGridProps {
  size: string
}

export interface ColorPickerTransparencyGridPrps
  extends Assign<HTMLArkProps<'div'>, TransparancyGridProps> {}

export const ColorPickerTransparencyGrid = forwardRef<
  HTMLDivElement,
  ColorPickerTransparencyGridPrps
>((props, ref) => {
  const [gridProps, localProps] = createSplitProps<TransparancyGridProps>()(props, ['size'])
  const api = useColorPickerContext()
  const mergedProps = mergeProps(api.getTransparencyGridProps(gridProps), localProps)

  return <ark.div {...mergedProps} ref={ref} />
})

ColorPickerTransparencyGrid.displayName = 'ColorPickerTransparencyGrid'
