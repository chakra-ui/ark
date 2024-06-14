import type { ChannelProps } from '@zag-js/color-picker'
import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import type { Assign } from '../../types'
import { createSplitProps } from '../../utils/create-split-props'
import { type HTMLArkProps, ark } from '../factory'
import { ColorPickerChannelPropsProvider } from './use-color-picker-channel-props-context'
import { useColorPickerContext } from './use-color-picker-context'
import { useColorPickerFormatPropsContext } from './use-color-picker-format-context'

export interface ColorPickerChannelSliderBaseProps extends ChannelProps {}
export interface ColorPickerChannelSliderProps
  extends Assign<HTMLArkProps<'div'>, ColorPickerChannelSliderBaseProps> {}

export const ColorPickerChannelSlider = forwardRef<HTMLDivElement, ColorPickerChannelSliderProps>(
  (props, ref) => {
    const [channelProps, localProps] = createSplitProps<ChannelProps>()(props, [
      'channel',
      'orientation',
    ])

    const colorPicker = useColorPickerContext()

    const formatProps = useColorPickerFormatPropsContext()
    const channelSliderProps = { ...channelProps, ...formatProps }

    const mergedProps = mergeProps(
      colorPicker.getChannelSliderProps(channelSliderProps),
      localProps,
    )

    return (
      <ColorPickerChannelPropsProvider value={channelProps}>
        <ark.div {...mergedProps} ref={ref} />
      </ColorPickerChannelPropsProvider>
    )
  },
)

ColorPickerChannelSlider.displayName = 'ColorPickerChannelSlider'
