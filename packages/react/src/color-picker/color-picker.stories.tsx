import type { Meta } from '@storybook/react'
import { useState } from 'react'
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
            <ColorPickerSwatch value={api.value} readOnly />
          </output>
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
            <ColorPickerSwatch value="#123123">
              <ColorPickerSwatchBackground />
            </ColorPickerSwatch>
            <ColorPickerSwatch value="#ff1321">
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
  const [color, setColor] = useState('hsl(10, 81%, 59%)')

  return (
    <ColorPicker value={color} onChange={(details) => setColor(details.value)}>
      <ColorPickerContent>{/* ... */}</ColorPickerContent>
    </ColorPicker>
  )
}
