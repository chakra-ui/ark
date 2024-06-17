import { mergeProps } from '@zag-js/solid'
import type { JSX } from 'solid-js'
import { type PolymorphicProps, ark } from '../factory'
import { useColorPickerChannelPropsContext } from './use-color-picker-channel-props-context'
import { useColorPickerContext } from './use-color-picker-context'

export interface ColorPickerChannelSliderValueTextBaseProps extends PolymorphicProps<'span'> {}
export interface ColorPickerChannelSliderValueTextProps
  extends JSX.HTMLAttributes<HTMLDivElement>,
    ColorPickerChannelSliderValueTextBaseProps {}

export const ColorPickerChannelSliderValueText = (
  props: ColorPickerChannelSliderValueTextProps,
) => {
  const colorPicker = useColorPickerContext()
  const channelProps = useColorPickerChannelPropsContext()
  const mergedProps = mergeProps(
    () => colorPicker().getChannelSliderValueTextProps(channelProps),
    props,
  )

  return <ark.span {...mergedProps} />
}
