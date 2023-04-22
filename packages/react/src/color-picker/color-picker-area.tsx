import { forwardRef } from '@polymorphic-factory/react'
import type { AreaProps } from '@zag-js/color-picker/dist/color-picker.types'
import { mergeProps } from '@zag-js/react'
import { createSplitProps } from '../create-split-props'
import { ark, type HTMLArkProps } from '../factory'
import { ColorPickerAreaProvider } from './color-picker-area-context'
import { useColorPickerContext } from './color-picker-context'

export type ColorPickerAreaProps = HTMLArkProps<'div'> & AreaProps

export const ColorPickerArea = forwardRef<'div', ColorPickerAreaProps>((props, ref) => {
  const [channelProps, divprops] = createSplitProps<AreaProps>()(props, ['xChannel', 'yChannel'])
  const { getAreaProps } = useColorPickerContext()
  const mergedProps = mergeProps(getAreaProps(channelProps), divprops)

  return (
    <ColorPickerAreaProvider value={channelProps}>
      <ark.div {...mergedProps} ref={ref} />
    </ColorPickerAreaProvider>
  )
})
