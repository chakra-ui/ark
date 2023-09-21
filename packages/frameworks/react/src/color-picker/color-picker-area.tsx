import type { ColorAreaProps } from '@zag-js/color-picker'
import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { createSplitProps } from '../create-split-props'
import { ark, type HTMLArkProps } from '../factory'
import type { Assign } from '../types'
import { ColorPickerAreaProvider } from './color-picker-area-context'
import { useColorPickerContext } from './color-picker-context'

export interface ColorPickerAreaProps extends Assign<HTMLArkProps<'div'>, ColorAreaProps> {}

export const ColorPickerArea = forwardRef<HTMLDivElement, ColorPickerAreaProps>((props, ref) => {
  const [channelProps, divprops] = createSplitProps<ColorAreaProps>()(props, [
    'xChannel',
    'yChannel',
  ])

  const api = useColorPickerContext()
  const mergedProps = mergeProps(api.getAreaProps(channelProps), divprops)

  return (
    <ColorPickerAreaProvider value={channelProps}>
      <ark.div {...mergedProps} ref={ref} />
    </ColorPickerAreaProvider>
  )
})

ColorPickerArea.displayName = 'ColorPickerArea'
