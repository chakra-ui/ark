import type { AreaProps } from '@zag-js/color-picker'
import { mergeProps } from '@zag-js/solid'
import type { Assign } from '../../types'
import { createSplitProps } from '../../utils/create-split-props'
import { type HTMLArkProps, ark } from '../factory'
import { ColorPickerAreaProvider } from './use-color-picker-area-context'
import { useColorPickerContext } from './use-color-picker-context'

export interface ColorPickerAreaProps extends Assign<HTMLArkProps<'div'>, AreaProps> {}

export const ColorPickerArea = (props: ColorPickerAreaProps) => {
  const [channelProps, divprops] = createSplitProps<AreaProps>()(props, ['xChannel', 'yChannel'])
  const api = useColorPickerContext()
  const mergedProps = mergeProps(() => api().getAreaProps(channelProps), divprops)

  return (
    <ColorPickerAreaProvider value={channelProps}>
      <ark.div {...mergedProps} />
    </ColorPickerAreaProvider>
  )
}
