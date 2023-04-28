<script setup lang="ts">
import { ref } from 'vue'
import {
  ColorPicker,
  ColorPickerArea,
  ColorPickerAreaGradient,
  ColorPickerAreaThumb,
  ColorPickerChannelInput,
  ColorPickerContent,
  type ColorPickerContext,
  ColorPickerEyeDropperTrigger,
  ColorPickerSliderThumb,
  ColorPickerSliderTrack,
  ColorPickerSwatch,
  ColorPickerSwatchGroup,
} from './'
import './color-picker.css'

const colorPickerValue = ref('hsl(10, 81%, 59%)')
</script>
<template>
  <Story title="ColorPicker - Basic">
    <ColorPicker
      v-model="colorPickerValue"
      v-slot="{ channels: [hue, saturation, lightness], value }: ColorPickerContext"
    >
      <ColorPickerContent>
        <output>
          <div>Color: {{ value }}</div>
        </output>
        <ColorPickerArea :xChannel="saturation" :yChannel="lightness">
          <ColorPickerAreaGradient />
          <ColorPickerAreaThumb />
        </ColorPickerArea>

        <ColorPickerSwatch :value="value" readOnly />

        <ColorPickerSliderTrack :channel="hue">
          <ColorPickerSliderThumb />
        </ColorPickerSliderTrack>

        <ColorPickerSliderTrack channel="alpha">
          <ColorPickerSliderThumb />
        </ColorPickerSliderTrack>

        <ColorPickerChannelInput :channel="hue" />
        <ColorPickerChannelInput :channel="saturation" />
        <ColorPickerChannelInput :channel="lightness" />

        <ColorPickerChannelInput channel="alpha" />
        <ColorPickerChannelInput channel="hex" />

        <ColorPickerSwatchGroup>
          <ColorPickerSwatch value="#123123" />
          <ColorPickerSwatch value="#ff1321" />
        </ColorPickerSwatchGroup>

        <ColorPickerEyeDropperTrigger>
          <button>Pick color</button>
        </ColorPickerEyeDropperTrigger>
      </ColorPickerContent>
    </ColorPicker>
  </Story>
</template>
