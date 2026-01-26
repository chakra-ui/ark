<script setup lang="ts">
import { ColorPicker, parseColor } from '@ark-ui/vue/color-picker'
import { Pipette } from 'lucide-vue-next'
import { ref } from 'vue'
import styles from 'styles/color-picker.module.css'

const value = ref(parseColor('hsl(20, 100%, 50%)'))
</script>

<template>
  <div class="stack">
    <output>Selected color: {{ value.toString('hex') }}</output>

    <ColorPicker.Root :class="styles.Root" v-model="value">
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
        </ColorPicker.Content>
      </ColorPicker.Positioner>

      <ColorPicker.HiddenInput />
    </ColorPicker.Root>
  </div>
</template>
