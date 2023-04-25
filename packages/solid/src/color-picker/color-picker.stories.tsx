import {
  ColorPicker,
  ColorPickerArea,
  ColorPickerAreaGradient,
  ColorPickerAreaThumb,
  ColorPickerChannelInput,
  ColorPickerContent,
  ColorPickerEyeDropperTrigger,
  ColorPickerSliderThumb,
  ColorPickerSliderTrack,
  ColorPickerSwatch,
  ColorPickerSwatchGroup,
} from './'
import './color-picker.css'

export const Basic = () => (
  <ColorPicker value="hsla(10, 81%, 59%, 1)">
    {(api) => {
      const [hue, saturation, lightness] = api.channels
      return (
        <ColorPickerContent>
          <output>
            <ColorPickerSwatch value={api.value} readOnly />
            <span>{api.value}</span>
          </output>

          <ColorPickerArea xChannel={saturation} yChannel={lightness}>
            <ColorPickerAreaGradient />
            <ColorPickerAreaThumb />
          </ColorPickerArea>

          <ColorPickerSliderTrack channel={hue}>
            <ColorPickerSliderThumb />
          </ColorPickerSliderTrack>
          <ColorPickerSliderTrack channel="alpha">
            <ColorPickerSliderThumb />
          </ColorPickerSliderTrack>

          <ColorPickerChannelInput channel={hue} />
          <ColorPickerChannelInput channel={saturation} />
          <ColorPickerChannelInput channel={lightness} />
          <ColorPickerChannelInput channel="alpha" />
          <ColorPickerChannelInput channel="hex" />

          <ColorPickerSwatchGroup>
            <ColorPickerSwatch value="hsla(153, 46%, 13%, 1)" />
            <ColorPickerSwatch value="hsla(356, 100%, 54%, 1)" />
          </ColorPickerSwatchGroup>
          <ColorPickerEyeDropperTrigger>
            <button>Pick color</button>
          </ColorPickerEyeDropperTrigger>
        </ColorPickerContent>
      )
    }}
  </ColorPicker>
)
