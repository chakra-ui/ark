import { createSignal } from 'solid-js'
import type { Meta } from 'storybook-solidjs'
import {
  ColorPicker,
  ColorPickerArea,
  ColorPickerAreaGradient,
  ColorPickerAreaThumb,
  ColorPickerChannelInput,
  ColorPickerChannelSliderBackground,
  ColorPickerChannelSliderThumb,
  ColorPickerChannelSliderTrack,
  ColorPickerContent,
  ColorPickerEyeDropperTrigger,
  ColorPickerSwatch,
  ColorPickerSwatchBackground,
  ColorPickerSwatchGroup,
} from './'
import './color-picker.css'

const meta: Meta = {
  title: 'ColorPicker',
}

export default meta

export const Basic = () => (
  <ColorPicker value="hsla(10, 81%, 59%, 1)">
    {(api) => {
      const [hue, saturation, lightness] = api().channels
      return (
        <ColorPickerContent>
          <ColorPickerArea xChannel={saturation} yChannel={lightness}>
            <ColorPickerAreaGradient />
            <ColorPickerAreaThumb />
          </ColorPickerArea>

          <ColorPickerChannelSliderTrack channel={hue}>
            <ColorPickerChannelSliderBackground />
            <ColorPickerChannelSliderThumb />
          </ColorPickerChannelSliderTrack>

          <ColorPickerChannelSliderTrack channel="alpha">
            <ColorPickerChannelSliderBackground />
            <ColorPickerChannelSliderThumb />
          </ColorPickerChannelSliderTrack>

          <ColorPickerChannelInput channel={hue} />
          <ColorPickerChannelInput channel={saturation} />
          <ColorPickerChannelInput channel={lightness} />
          <ColorPickerChannelInput channel="alpha" />

          <ColorPickerSwatchGroup>
            <ColorPickerSwatch value="hsla(153, 46%, 13%, 1)">
              <ColorPickerSwatchBackground />
            </ColorPickerSwatch>
            <ColorPickerSwatch value="hsla(356, 100%, 54%, 1)">
              <ColorPickerSwatchBackground />
            </ColorPickerSwatch>
          </ColorPickerSwatchGroup>
          <ColorPickerEyeDropperTrigger>Pick color</ColorPickerEyeDropperTrigger>
        </ColorPickerContent>
      )
    }}
  </ColorPicker>
)

export const Controlled = () => {
  const [color, setColor] = createSignal('hsl(10, 81%, 59%)')
  return (
    <ColorPicker value={color()} onChange={(details) => setColor(details.value)}>
      <ColorPickerContent>{/* ... */}</ColorPickerContent>
    </ColorPicker>
  )
}
