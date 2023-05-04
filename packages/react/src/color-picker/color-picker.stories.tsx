import type { Meta } from '@storybook/react'
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

type ColorPickerType = typeof ColorPicker

const meta: Meta<ColorPickerType> = {
  title: 'ColorPicker',
  component: ColorPicker,
}

export default meta

export const Basic = () => (
  <ColorPicker defaultValue="hsl(10, 81%, 59%)">
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
