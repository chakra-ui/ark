<script setup lang="ts">
import { ref, type UnwrapRef } from 'vue'
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
  type ColorPickerContext,
} from './'
import './color-picker.css'

const colorPickerValue = ref('hsla(200, 81%, 59%, 0.5)')
</script>
<template>
  <Story title="ColorPicker">
    <Variant title="Basic">
      <ColorPicker
        v-model="colorPickerValue"
        v-slot="{ channels: [hue, saturation, lightness], value }: UnwrapRef<ColorPickerContext>"
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

          <ColorPickerChannelSliderTrack :channel="hue">
            <ColorPickerChannelSliderBackground />
            <ColorPickerChannelSliderThumb />
          </ColorPickerChannelSliderTrack>

          <ColorPickerChannelSliderTrack channel="alpha">
            <ColorPickerChannelSliderBackground />
            <ColorPickerChannelSliderThumb />
          </ColorPickerChannelSliderTrack>

          <ColorPickerChannelInput :channel="hue" />
          <ColorPickerChannelInput :channel="saturation" />
          <ColorPickerChannelInput :channel="lightness" />

          <ColorPickerChannelInput channel="alpha" />
          <ColorPickerChannelInput channel="hue" />

          <ColorPickerSwatchGroup>
            <ColorPickerSwatch value="#123123">
              <ColorPickerSwatchBackground />
            </ColorPickerSwatch>
            <ColorPickerSwatch value="#ff1321">
              <ColorPickerSwatchBackground />
            </ColorPickerSwatch>
          </ColorPickerSwatchGroup>

          <ColorPickerEyeDropperTrigger> Pick color </ColorPickerEyeDropperTrigger>
        </ColorPickerContent>
      </ColorPicker>
    </Variant>
  </Story>
</template>
