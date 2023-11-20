import type { TransparencyGridProps } from '@zag-js/color-picker'
import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { createSplitProps } from '../create-split-props'
import { ark, type HTMLArkProps } from '../factory'
import type { Assign } from '../types'
import { useColorPickerContext } from './color-picker-context'

export interface ColorPickerTransparencyGridProps
  extends Assign<HTMLArkProps<'div'>, TransparencyGridProps> {}

export const ColorPickerTransparencyGrid = forwardRef<
  HTMLDivElement,
  ColorPickerTransparencyGridProps
>((props, ref) => {
  const [gridProps, localProps] = createSplitProps<TransparencyGridProps>()(props, ['size'])
  const api = useColorPickerContext()
  const mergedProps = mergeProps(api.getTransparencyGridProps(gridProps), localProps)

  return <ark.div {...mergedProps} ref={ref} />
})

ColorPickerTransparencyGrid.displayName = 'ColorPickerTransparencyGrid'
