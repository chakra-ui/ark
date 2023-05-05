import type { ColorAreaProps } from '@zag-js/color-picker'
import { mergeProps } from '@zag-js/react'
import { createSplitProps } from '../create-split-props'
import { ark, type HTMLArkProps } from '../factory'
import { forwardRef } from '../forward-ref'
import { ColorPickerAreaProvider } from './color-picker-area-context'
import { useColorPickerContext } from './color-picker-context'

export type ColorPickerAreaProps = HTMLArkProps<'div'> & ColorAreaProps

export const ColorPickerArea = forwardRef<'div', ColorPickerAreaProps>((props, ref) => {
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
