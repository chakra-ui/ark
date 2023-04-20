import {
  ColorPicker,
  ColorPickerChannelInput,
  ColorPickerContent,
  ColorPickerEyeDropperTrigger,
  ColorPickerSliderThumb,
  ColorPickerSliderTrack,
  ColorPickerSwatch,
} from './'
import './color-picker.css'

export const Basic = () => {
  return (
    <ColorPicker>
      {(api) => {
        const [hue, saturation, lightness] = api.channels
        return (
          <ColorPickerContent>
            <output>
              <div>Color: {api.value}</div>
            </output>

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

            <div>
              <ColorPickerSwatch value="#123123" />
              <ColorPickerSwatch value="#ff1321" />
            </div>

            <ColorPickerEyeDropperTrigger>
              <button>Pick color</button>
            </ColorPickerEyeDropperTrigger>
          </ColorPickerContent>
        )
      }}
    </ColorPicker>
  )
}
