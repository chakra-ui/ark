import type { AreaProps } from '@zag-js/color-picker'
import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { createSplitProps } from '../create-split-props'
import { ark, type HTMLArkProps } from '../factory'
import type { Assign } from '../types'
import { ColorPickerAreaPropsProvider } from './use-color-picker-area-props-context'
import { useColorPickerContext } from './use-color-picker-context'

export interface ColorPickerAreaProps extends Assign<HTMLArkProps<'div'>, AreaProps> {}

export const ColorPickerArea = forwardRef<HTMLDivElement, ColorPickerAreaProps>((props, ref) => {
  const [areaProps, localProps] = createSplitProps<AreaProps>()(props, ['xChannel', 'yChannel'])
  const colorPicker = useColorPickerContext()
  const mergedProps = mergeProps(colorPicker.getAreaProps(areaProps), localProps)

  return (
    <ColorPickerAreaPropsProvider value={areaProps}>
      <ark.div {...mergedProps} ref={ref} />
    </ColorPickerAreaPropsProvider>
  )
})

ColorPickerArea.displayName = 'ColorPickerArea'
