import { ColorPicker } from '../..'
import type { ChannelSliderBaseProps } from '../color-picker'

export const ColorPickerContent = () => {
  return (
    <ColorPicker.Content>
      <ColorPicker.Area>
        <ColorPicker.AreaBackground />
        <ColorPicker.AreaThumb />
      </ColorPicker.Area>

      <ColorPicker.ChannelSlider channel="hue">
        <ColorPicker.ChannelSliderTrack />
        <ColorPicker.ChannelSliderThumb />
      </ColorPicker.ChannelSlider>

      <ColorPicker.ChannelSlider channel="alpha">
        <ColorPicker.TransparencyGrid />
        <ColorPicker.ChannelSliderTrack />
        <ColorPicker.ChannelSliderThumb />
      </ColorPicker.ChannelSlider>

      <ColorPicker.SwatchGroup>
        <ColorPicker.SwatchTrigger value="red">
          <ColorPicker.Swatch value="red">
            <ColorPicker.SwatchIndicator>✓</ColorPicker.SwatchIndicator>
          </ColorPicker.Swatch>
        </ColorPicker.SwatchTrigger>
        <ColorPicker.SwatchTrigger value="blue">
          <ColorPicker.Swatch value="blue">
            <ColorPicker.SwatchIndicator>✓</ColorPicker.SwatchIndicator>
          </ColorPicker.Swatch>
        </ColorPicker.SwatchTrigger>
        <ColorPicker.SwatchTrigger value="green">
          <ColorPicker.Swatch value="green">
            <ColorPicker.SwatchIndicator>✓</ColorPicker.SwatchIndicator>
          </ColorPicker.Swatch>
        </ColorPicker.SwatchTrigger>
      </ColorPicker.SwatchGroup>

      <ColorPicker.View format="rgba">
        <ColorPicker.ChannelInput channel="hex" />
        <ColorPicker.ChannelInput channel="alpha" />
      </ColorPicker.View>

      <ColorPicker.View format="hsla">
        <ColorPicker.ChannelInput channel="hue" />
        <ColorPicker.ChannelInput channel="saturation" />
        <ColorPicker.ChannelInput channel="lightness" />
      </ColorPicker.View>

      <ColorPicker.EyeDropperTrigger>Pick color</ColorPicker.EyeDropperTrigger>
    </ColorPicker.Content>
  )
}

export const ColorPickerControl = () => {
  return (
    <ColorPicker.Control>
      <ColorPicker.ChannelInput channel="hex" />
      <ColorPicker.ChannelInput channel="alpha" />
      <ColorPicker.ValueText />
      <ColorPicker.Trigger>
        <ColorPicker.TransparencyGrid />
        <ColorPicker.Context>
          {(colorPicker) => <ColorPicker.Swatch value={colorPicker.value} />}
        </ColorPicker.Context>
      </ColorPicker.Trigger>
    </ColorPicker.Control>
  )
}

export const ColorPickerSwatch = (props: ColorPicker.SwatchBaseProps) => {
  const { value, ...rest } = props
  return (
    <ColorPicker.SwatchTrigger value={value} {...rest}>
      <ColorPicker.Swatch value={value}>
        <ColorPicker.SwatchIndicator>✓</ColorPicker.SwatchIndicator>
      </ColorPicker.Swatch>
    </ColorPicker.SwatchTrigger>
  )
}

export const ColorPickerSlider = (props: ChannelSliderBaseProps) => {
  return (
    <ColorPicker.ChannelSlider {...props}>
      <ColorPicker.TransparencyGrid />
      <ColorPicker.ChannelSliderTrack />
      <ColorPicker.ChannelSliderThumb />
    </ColorPicker.ChannelSlider>
  )
}
