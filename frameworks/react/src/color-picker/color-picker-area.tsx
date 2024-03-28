import type { AreaProps } from '@zag-js/color-picker'
import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { createSplitProps } from '../create-split-props'
import { ark, type HTMLArkProps } from '../factory'
import type { Assign } from '../types'
import { ColorPickerAreaProvider } from './use-color-picker-area-context'
import { useColorPickerContext } from './use-color-picker-context'

export interface ColorPickerAreaProps extends Assign<HTMLArkProps<'div'>, AreaProps> {}

export const ColorPickerArea = forwardRef<HTMLDivElement, ColorPickerAreaProps>((props, ref) => {
  const [areaProps, divprops] = createSplitProps<AreaProps>()(props, ['xChannel', 'yChannel'])
  const context = useColorPickerContext()
  const mergedProps = mergeProps(context.getAreaProps(areaProps), divprops)

  return (
    <ColorPickerAreaProvider value={areaProps}>
      <ark.div {...mergedProps} ref={ref} />
    </ColorPickerAreaProvider>
  )
})

ColorPickerArea.displayName = 'ColorPickerArea'
