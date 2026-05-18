import type { AreaProps } from '@zag-js/color-picker'
import { mergeProps } from '@zag-js/solid'
import { createSplitProps } from '../../utils/create-split-props.ts'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.tsx'
import { ColorPickerAreaPropsProvider } from './use-color-picker-area-props-context.ts'
import { useColorPickerContext } from './use-color-picker-context.ts'

export interface ColorPickerAreaBaseProps extends AreaProps, PolymorphicProps<'div'> {}
export interface ColorPickerAreaProps extends HTMLProps<'div'>, ColorPickerAreaBaseProps {}

export const ColorPickerArea = (props: ColorPickerAreaProps) => {
  const [channelProps, divprops] = createSplitProps<AreaProps>()(props, ['xChannel', 'yChannel'])
  const api = useColorPickerContext()
  const mergedProps = mergeProps(() => api().getAreaProps(channelProps), divprops)

  return (
    <ColorPickerAreaPropsProvider value={channelProps}>
      <ark.div {...mergedProps} />
    </ColorPickerAreaPropsProvider>
  )
}
