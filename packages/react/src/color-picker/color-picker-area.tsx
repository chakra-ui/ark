import type { ColorAreaProps } from '@zag-js/color-picker'
import { mergeProps } from '@zag-js/react'
import { forwardRef, type ComponentPropsWithoutRef } from 'react'
import { createSplitProps } from '../create-split-props'
import { ark } from '../factory'
import type { Assign } from '../types'
import { ColorPickerAreaProvider } from './color-picker-area-context'
import { useColorPickerContext } from './color-picker-context'

export type ColorPickerAreaProps = Assign<ComponentPropsWithoutRef<typeof ark.div>, ColorAreaProps>

export const ColorPickerArea = forwardRef<HTMLDivElement, ColorPickerAreaProps>((props, ref) => {
  const [channelProps, divprops] = createSplitProps<ColorAreaProps>()(props, [
    'xChannel',
    'yChannel',
  ])
  const { getAreaProps } = useColorPickerContext()
  const mergedProps = mergeProps(getAreaProps(channelProps), divprops)

  return (
    <ColorPickerAreaProvider value={channelProps}>
      <ark.div {...mergedProps} ref={ref} />
    </ColorPickerAreaProvider>
  )
})

ColorPickerArea.displayName = 'ColorPickerArea'
