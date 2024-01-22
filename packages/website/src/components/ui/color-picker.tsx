import * as Ark from '@ark-ui/react/src/color-picker'
import { styled } from 'styled-system/jsx'
import { colorPicker, type ColorPickerVariantProps } from 'styled-system/recipes'
import { createStyleContext } from '~/lib/create-style-context'

const { withProvider, withContext } = createStyleContext(colorPicker)

export * from '@ark-ui/react/src/color-picker'
export type ColorPickerProps = Ark.ColorPickerRootProps & ColorPickerVariantProps

const ColorPickerRoot = withProvider(styled(Ark.ColorPicker.Root), 'root')
export const ColorPickerArea = withContext(styled(Ark.ColorPicker.Area), 'area')
export const ColorPickerAreaBackground = withContext(
  styled(Ark.ColorPicker.AreaBackground),
  'areaBackground',
)
export const ColorPickerAreaThumb = withContext(styled(Ark.ColorPicker.AreaThumb), 'areaThumb')
export const ColorPickerChannelInput = withContext(
  styled(Ark.ColorPicker.ChannelInput),
  'channelInput',
)
export const ColorPickerChannelSlider = withContext(
  styled(Ark.ColorPicker.ChannelSlider),
  'channelSlider',
)
export const ColorPickerChannelSliderThumb = withContext(
  styled(Ark.ColorPicker.ChannelSliderThumb),
  'channelSliderThumb',
)
export const ColorPickerChannelSliderTrack = withContext(
  styled(Ark.ColorPicker.ChannelSliderTrack),
  'channelSliderTrack',
)
export const ColorPickerContent = withContext(styled(Ark.ColorPicker.Content), 'content')
export const ColorPickerControl = withContext(styled(Ark.ColorPicker.Control), 'control')
export const ColorPickerEyeDropperTrigger = withContext(
  styled(Ark.ColorPicker.EyeDropperTrigger),
  'eyeDropperTrigger',
)
// export const ColorPickerFormatTrigger = withContext(
//   styled(Ark.ColorPicker.FormatTrigger),
//   'formatTrigger',
// )
// export const ColorPickerFormatSelect = withContext(
//   styled(Ark.ColorPicker.FormatSelect),
//   'formatSelect',
// )
export const ColorPickerLabel = withContext(styled(Ark.ColorPicker.Label), 'label')
export const ColorPickerPositioner = withContext(styled(Ark.ColorPicker.Positioner), 'positioner')
export const ColorPickerSwatch = withContext(styled(Ark.ColorPicker.Swatch), 'swatch')
export const ColorPickerSwatchGroup = withContext(
  styled(Ark.ColorPicker.SwatchGroup),
  'swatchGroup',
)
export const ColorPickerSwatchTrigger = withContext(
  styled(Ark.ColorPicker.SwatchTrigger),
  'swatchTrigger',
)
// export const ColorPickerSwatchIndicator = withContext(
//   styled(Ark.ColorPicker.SwatchIndicator),
//   'swatchIndicator',
// )
export const ColorPickerTransparencyGrid = withContext(
  styled(Ark.ColorPicker.TransparencyGrid),
  'transparencyGrid',
)
export const ColorPickerTrigger = withContext(styled(Ark.ColorPicker.Trigger), 'trigger')
export const ColorPickerValueText = withContext(styled(Ark.ColorPicker.ValueText), 'valueText')
export const ColorPickerView = withContext(styled(Ark.ColorPicker.View), 'view')

export const ColorPicker = Object.assign(ColorPickerRoot, {
  Root: ColorPickerRoot,
  Area: ColorPickerArea,
  AreaBackground: ColorPickerAreaBackground,
  AreaThumb: ColorPickerAreaThumb,
  ChannelInput: ColorPickerChannelInput,
  ChannelSlider: ColorPickerChannelSlider,
  ChannelSliderThumb: ColorPickerChannelSliderThumb,
  ChannelSliderTrack: ColorPickerChannelSliderTrack,
  Content: ColorPickerContent,
  Control: ColorPickerControl,
  EyeDropperTrigger: ColorPickerEyeDropperTrigger,
  // FormatTrigger: ColorPickerFormatTrigger,
  // FormatSelect: ColorPickerFormatSelect,
  Label: ColorPickerLabel,
  Positioner: ColorPickerPositioner,
  Swatch: ColorPickerSwatch,
  SwatchGroup: ColorPickerSwatchGroup,
  // SwatchIndicator: ColorPickerSwatchIndicator,
  SwatchTrigger: ColorPickerSwatchTrigger,
  TransparencyGrid: ColorPickerTransparencyGrid,
  Trigger: ColorPickerTrigger,
  ValueText: ColorPickerValueText,
  View: ColorPickerView,
})
