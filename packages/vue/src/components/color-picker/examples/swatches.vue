<script setup lang="ts">
import { ColorPicker, parseColor } from '@ark-ui/vue/color-picker'
import { Check, Pipette } from 'lucide-vue-next'
import styles from 'styles/color-picker.module.css'

const swatches = ['red', 'blue', 'green', 'orange']
</script>

<template>
  <ColorPicker.Root :class="styles.Root" :default-value="parseColor('#eb5e41')">
    <ColorPicker.Label :class="styles.Label">Color</ColorPicker.Label>

    <ColorPicker.Control :class="styles.Control">
      <ColorPicker.ChannelInput :class="styles.Input" channel="hex" />
      <ColorPicker.ChannelInput :class="styles.ChannelInput" channel="alpha" />
      <ColorPicker.Trigger :class="styles.Trigger">
        <div :class="styles.Swatch">
          <ColorPicker.TransparencyGrid :class="styles.TransparencyGrid" />
          <ColorPicker.ValueSwatch :class="styles.ValueSwatch" />
        </div>
      </ColorPicker.Trigger>
    </ColorPicker.Control>

    <ColorPicker.Positioner>
      <ColorPicker.Content :class="styles.Content">
        <ColorPicker.Area :class="styles.Area">
          <ColorPicker.AreaBackground :class="styles.AreaBackground" />
          <ColorPicker.AreaThumb :class="styles.AreaThumb" />
        </ColorPicker.Area>
        <div :class="styles.SliderGroup">
          <ColorPicker.EyeDropperTrigger :class="styles.EyeDropperTrigger">
            <Pipette />
          </ColorPicker.EyeDropperTrigger>
          <div :class="styles.ChannelSliders">
            <ColorPicker.ChannelSlider :class="styles.ChannelSlider" channel="hue">
              <ColorPicker.ChannelSliderTrack :class="styles.ChannelSliderTrack" />
              <ColorPicker.ChannelSliderThumb :class="styles.ChannelSliderThumb" />
            </ColorPicker.ChannelSlider>
            <ColorPicker.ChannelSlider :class="styles.ChannelSlider" channel="alpha">
              <ColorPicker.TransparencyGrid :class="styles.TransparencyGrid" />
              <ColorPicker.ChannelSliderTrack :class="styles.ChannelSliderTrack" />
              <ColorPicker.ChannelSliderThumb :class="styles.ChannelSliderThumb" />
            </ColorPicker.ChannelSlider>
          </div>
        </div>
        <ColorPicker.SwatchGroup :class="styles.SwatchGroup">
          <ColorPicker.SwatchTrigger
            v-for="color in swatches"
            :key="color"
            :class="styles.SwatchTrigger"
            :value="color"
          >
            <ColorPicker.Swatch :class="styles.Swatch" :value="color">
              <ColorPicker.SwatchIndicator :class="styles.SwatchIndicator">
                <Check />
              </ColorPicker.SwatchIndicator>
            </ColorPicker.Swatch>
          </ColorPicker.SwatchTrigger>
        </ColorPicker.SwatchGroup>
      </ColorPicker.Content>
    </ColorPicker.Positioner>
    <ColorPicker.HiddenInput />
  </ColorPicker.Root>
</template>
