import type { ColorAreaProps } from '@zag-js/color-picker'
import { mergeProps } from '@zag-js/react'
import { createSplitProps } from '../create-split-props'
import { ark, type HTMLArkProps } from '../factory'
import { forwardRef } from '../forward-ref'
import type { Assign } from '../types'
import { ColorPickerAreaProvider } from './color-picker-area-context'
import { useColorPickerContext } from './color-picker-context'

export type ColorPickerAreaProps = Assign<HTMLArkProps<'div'>, ColorAreaProps>

export const ColorPickerArea = forwardRef<'div', ColorAreaProps>((props, ref) => {
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
