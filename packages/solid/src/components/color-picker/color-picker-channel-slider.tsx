import type { ChannelProps } from '@zag-js/color-picker'
import { mergeProps } from '@zag-js/solid'
import { createSplitProps } from '../../utils/create-split-props.ts'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.tsx'
import { ColorPickerChannelPropsProvider } from './use-color-picker-channel-props-context.ts'
import { useColorPickerContext } from './use-color-picker-context.ts'
import { useColorPickerFormatPropsContext } from './use-color-picker-format-context.ts'

export interface ColorPickerChannelSliderBaseProps extends ChannelProps, PolymorphicProps<'div'> {}
export interface ColorPickerChannelSliderProps extends HTMLProps<'div'>, ColorPickerChannelSliderBaseProps {}

export const ColorPickerChannelSlider = (props: ColorPickerChannelSliderProps) => {
  const [channelProps, localProps] = createSplitProps<ChannelProps>()(props, ['channel', 'orientation'])

  const api = useColorPickerContext()

  const formatProps = useColorPickerFormatPropsContext()
  const channelSliderProps = mergeProps(channelProps, formatProps)

  const mergedProps = mergeProps(() => api().getChannelSliderProps(channelSliderProps), localProps)

  return (
    <ColorPickerChannelPropsProvider value={channelProps}>
      <ark.div {...mergedProps} />
    </ColorPickerChannelPropsProvider>
  )
}
