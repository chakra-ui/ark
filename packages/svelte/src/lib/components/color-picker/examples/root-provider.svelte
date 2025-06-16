<script lang="ts">
  import { ColorPicker, parseColor, useColorPicker } from '@ark-ui/svelte/color-picker'

  const id = $props.id()
  const colorPicker = useColorPicker({
    id,
    defaultValue: parseColor('#eb5e41'),
  })
</script>

<div>
  <p>External state: {colorPicker().valueAsString}</p>

  <ColorPicker.RootProvider value={colorPicker}>
    <ColorPicker.Label>Color</ColorPicker.Label>
    <ColorPicker.Control>
      <ColorPicker.ValueText />
      <ColorPicker.Trigger>
        <ColorPicker.ValueSwatch />
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
    <ColorPicker.HiddenInput />
  </ColorPicker.RootProvider>
</div>
