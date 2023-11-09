<script setup lang="ts">
import { ref } from 'vue'
import { ColorPicker } from './'
import './color-picker.css'

const value = ref('hsl(0, 100%, 50%)')
</script>
<template>
  <Story title="ColorPicker">
    <Variant title="Basic">
      <ColorPicker.Root v-model="value">
        <ColorPicker.Label>Color</ColorPicker.Label>
        <ColorPicker.Control>
          <ColorPicker.ChannelInput channel="hex" />
          <ColorPicker.ChannelInput channel="alpha" />
          <ColorPicker.Trigger>
            <ColorPicker.Swatch value="red">
              <ColorPicker.TransparencyGrid size="10px" />
            </ColorPicker.Swatch>
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
              <ColorPicker.TransparencyGrid size="16px" />
              <ColorPicker.ChannelSliderTrack />
              <ColorPicker.ChannelSliderThumb />
            </ColorPicker.ChannelSlider>
            <ColorPicker.SwatchGroup>
              <ColorPicker.SwatchTrigger value="red">
                <ColorPicker.Swatch value="red" />
              </ColorPicker.SwatchTrigger>
              <ColorPicker.SwatchTrigger value="blue">
                <ColorPicker.Swatch value="blue" />
              </ColorPicker.SwatchTrigger>
              <ColorPicker.SwatchTrigger value="green">
                <ColorPicker.Swatch value="green" />
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
      </ColorPicker.Root>
    </Variant>
  </Story>
</template>
