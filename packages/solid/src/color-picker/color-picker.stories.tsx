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
  <ColorPicker value="hsl(10, 81%, 59%)">
    {(api) => {
      const [hue, saturation, lightness] = api.channels
      return (
        <ColorPickerContent>
          <output>
            <div>Color: {api.value}</div>
          </output>
          <ColorPickerArea xChannel={saturation} yChannel={lightness}>
            <ColorPickerAreaGradient />
            <ColorPickerAreaThumb />
          </ColorPickerArea>

          <ColorPickerSwatch value={api.value} readOnly />

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
            <ColorPickerSwatch value="#123123" />
            <ColorPickerSwatch value="#ff1321" />
          </ColorPickerSwatchGroup>

          <ColorPickerEyeDropperTrigger>
            <button>Pick color</button>
          </ColorPickerEyeDropperTrigger>
        </ColorPickerContent>
      )
    }}
  </ColorPicker>
)
