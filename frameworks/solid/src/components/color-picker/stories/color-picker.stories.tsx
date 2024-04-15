import { createSignal } from 'solid-js'
import type { Meta } from 'storybook-solidjs'
import { ColorPicker } from '../'

const meta: Meta = {
  title: 'Components / Color Picker',
}

export default meta

export const Basic = () => {
  return (
    <ColorPicker.Root value="#eb5e41">
      <ColorPicker.Context>
        {(api) => (
          <>
            <ColorPicker.Label>Color</ColorPicker.Label>
            <ColorPicker.Control>
              <ColorPicker.ChannelInput channel="hex" />
              <ColorPicker.ChannelInput channel="alpha" />
              <ColorPicker.ValueText />
              <ColorPicker.Trigger>
                <ColorPicker.TransparencyGrid />
                <ColorPicker.Swatch value={api().value} />
              </ColorPicker.Trigger>
            </ColorPicker.Control>
            <ColorPicker.Positioner>
              <ColorPicker.Content>
                <ColorPicker.FormatTrigger>Toggle ColorFormat</ColorPicker.FormatTrigger>
                <ColorPicker.FormatSelect />
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
            </ColorPicker.Positioner>
          </>
        )}
      </ColorPicker.Context>
    </ColorPicker.Root>
  )
}

export const Controlled = () => {
  const [currentValue, setCurrentValue] = createSignal('hsl(0, 100%, 50%)')

  return (
    <ColorPicker.Root
      value={currentValue()}
      onValueChange={(details) => setCurrentValue(details.valueAsString)}
      onValueChangeEnd={(details) => console.log(details.valueAsString)}
    >
      <ColorPicker.Context>
        {(api) => (
          <>
            <ColorPicker.Label>Color</ColorPicker.Label>
            <ColorPicker.Control>
              <ColorPicker.ChannelInput channel="hex" />
              <ColorPicker.ChannelInput channel="alpha" />
              <ColorPicker.ValueText />
              <ColorPicker.Trigger>
                <ColorPicker.TransparencyGrid />
                <ColorPicker.Swatch value={api().value} />
              </ColorPicker.Trigger>
            </ColorPicker.Control>
            <ColorPicker.Positioner>
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
            </ColorPicker.Positioner>
          </>
        )}
      </ColorPicker.Context>
    </ColorPicker.Root>
  )
}
