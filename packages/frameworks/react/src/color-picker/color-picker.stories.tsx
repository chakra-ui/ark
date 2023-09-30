import type { Meta } from '@storybook/react'
import { useState } from 'react'
import { ColorPicker } from './'
import './color-picker.css'

type ColorPickerType = typeof ColorPicker

const meta: Meta<ColorPickerType> = {
  title: 'ColorPicker',
  component: ColorPicker,
}

export default meta

export const Basic = () => (
  <ColorPicker.Root defaultValue="hsl(10, 81%, 59%)">
    {(api) => {
      const [hue, saturation, lightness] = api.channels
      return (
        <ColorPicker.Content>
          <output>
            <ColorPicker.Swatch value={api.value} readOnly />
          </output>
          <ColorPicker.Area xChannel={saturation} yChannel={lightness}>
            <ColorPicker.AreaGradient />
            <ColorPicker.AreaThumb />
          </ColorPicker.Area>

          <ColorPicker.ChannelSliderTrack channel={hue}>
            <ColorPicker.ChannelSliderBackground />
            <ColorPicker.ChannelSliderThumb />
          </ColorPicker.ChannelSliderTrack>

          <ColorPicker.ChannelSliderTrack channel="alpha">
            <ColorPicker.ChannelSliderBackground />
            <ColorPicker.ChannelSliderThumb />
          </ColorPicker.ChannelSliderTrack>

          <ColorPicker.ChannelInput channel={hue} />
          <ColorPicker.ChannelInput channel={saturation} />
          <ColorPicker.ChannelInput channel={lightness} />
          <ColorPicker.ChannelInput channel="alpha" />

          <ColorPicker.SwatchGroup>
            <ColorPicker.Swatch value="#123123">
              <ColorPicker.SwatchBackground />
            </ColorPicker.Swatch>
            <ColorPicker.Swatch value="#ff1321">
              <ColorPicker.SwatchBackground />
            </ColorPicker.Swatch>
          </ColorPicker.SwatchGroup>

          <ColorPicker.EyeDropperTrigger>Pick color</ColorPicker.EyeDropperTrigger>
        </ColorPicker.Content>
      )
    }}
  </ColorPicker.Root>
)

export const Controlled = () => {
  const [color, setColor] = useState('hsl(10, 81%, 59%)')

  return (
    <ColorPicker.Root value={color} onValueChange={(details) => setColor(details.value)}>
      <ColorPicker.Content>{/* ... */}</ColorPicker.Content>
    </ColorPicker.Root>
  )
}
