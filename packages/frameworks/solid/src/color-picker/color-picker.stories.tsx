import { createSignal } from 'solid-js'
import type { Meta } from 'storybook-solidjs'
import { ColorPicker } from './'
import './color-picker.css'

const meta: Meta = {
  title: 'ColorPicker',
}

export default meta

export const Basic = () => (
  <ColorPicker.Root value="hsla(10, 81%, 59%, 1)">
    {(api) => {
      const [hue, saturation, lightness] = api().channels
      return (
        <ColorPicker.Content>
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
            <ColorPicker.Swatch value="hsla(153, 46%, 13%, 1)">
              <ColorPicker.SwatchBackground />
            </ColorPicker.Swatch>
            <ColorPicker.Swatch value="hsla(356, 100%, 54%, 1)">
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
  const [color, setColor] = createSignal('hsl(10, 81%, 59%)')
  return (
    <ColorPicker.Root value={color()} onValueChange={(details) => setColor(details.value)}>
      <ColorPicker.Content>{/* ... */}</ColorPicker.Content>
    </ColorPicker.Root>
  )
}
