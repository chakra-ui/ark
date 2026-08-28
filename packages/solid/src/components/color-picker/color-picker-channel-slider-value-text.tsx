import { mergeProps } from '@zag-js/solid'
import { useLocaleContext } from '../../providers/index.tsx'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.tsx'
import { useColorPickerChannelPropsContext } from './use-color-picker-channel-props-context.ts'
import { useColorPickerContext } from './use-color-picker-context.ts'

export interface ColorPickerChannelSliderValueTextBaseProps extends PolymorphicProps<'span'> {}
export interface ColorPickerChannelSliderValueTextProps
  extends HTMLProps<'div'>, ColorPickerChannelSliderValueTextBaseProps {}

export const ColorPickerChannelSliderValueText = (props: ColorPickerChannelSliderValueTextProps) => {
  const colorPicker = useColorPickerContext()
  const localeContext = useLocaleContext()
  const channelProps = useColorPickerChannelPropsContext()
  const mergedProps = mergeProps(() => colorPicker().getChannelSliderValueTextProps(channelProps), props)

  return (
    <ark.span {...mergedProps}>
      {props.children || colorPicker().getChannelValueText(channelProps.channel, localeContext().locale)}
    </ark.span>
  )
}
