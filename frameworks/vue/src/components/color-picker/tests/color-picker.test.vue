<script setup lang="ts">
import {
  ColorPickerArea,
  ColorPickerAreaBackground,
  ColorPickerAreaThumb,
  ColorPickerChannelInput,
  ColorPickerChannelSlider,
  ColorPickerChannelSliderThumb,
  ColorPickerChannelSliderTrack,
  ColorPickerContent,
  ColorPickerContext,
  ColorPickerControl,
  ColorPickerEyeDropperTrigger,
  ColorPickerFormatSelect,
  ColorPickerFormatTrigger,
  ColorPickerLabel,
  ColorPickerPositioner,
  ColorPickerRoot,
  ColorPickerSwatch,
  ColorPickerSwatchGroup,
  ColorPickerSwatchIndicator,
  ColorPickerSwatchTrigger,
  ColorPickerTransparencyGrid,
  ColorPickerTrigger,
  ColorPickerValueText,
  ColorPickerView,
} from '..'
</script>

<template>
  <ColorPickerRoot :modelValue="'#eb5e41'">
    <ColorPickerLabel>Color</ColorPickerLabel>
    <ColorPickerControl>
      <ColorPickerChannelInput channel="hex" />
      <ColorPickerChannelInput channel="alpha" />
      <ColorPickerValueText />
      <ColorPickerTrigger data-testid="trigger">
        <ColorPickerTransparencyGrid />
        <ColorPickerContext v-slot="colorPicker">
          <ColorPickerSwatch :value="colorPicker.value" data-testid="swatch-trigger" />
        </ColorPickerContext>
      </ColorPickerTrigger>
    </ColorPickerControl>
    <ColorPickerPositioner data-testid="positioner">
      <ColorPickerContent>
        <ColorPickerFormatTrigger>Toggle ColorFormat</ColorPickerFormatTrigger>
        <ColorPickerFormatSelect />
        <ColorPickerArea>
          <ColorPickerAreaBackground />
          <ColorPickerAreaThumb />
        </ColorPickerArea>
        <ColorPickerChannelSlider channel="hue">
          <ColorPickerChannelSliderTrack />
          <ColorPickerChannelSliderThumb />
        </ColorPickerChannelSlider>
        <ColorPickerChannelSlider channel="alpha">
          <ColorPickerTransparencyGrid />
          <ColorPickerChannelSliderTrack />
          <ColorPickerChannelSliderThumb />
        </ColorPickerChannelSlider>
        <ColorPickerSwatchGroup>
          <ColorPickerSwatchTrigger value="red">
            <ColorPickerSwatch value="red">
              <ColorPickerSwatchIndicator>✓</ColorPickerSwatchIndicator>
            </ColorPickerSwatch>
          </ColorPickerSwatchTrigger>
          <ColorPickerSwatchTrigger value="blue">
            <ColorPickerSwatch value="blue">
              <ColorPickerSwatchIndicator>✓</ColorPickerSwatchIndicator>
            </ColorPickerSwatch>
          </ColorPickerSwatchTrigger>
          <ColorPickerSwatchTrigger value="green">
            <ColorPickerSwatch value="green">
              <ColorPickerSwatchIndicator>✓</ColorPickerSwatchIndicator>
            </ColorPickerSwatch>
          </ColorPickerSwatchTrigger>
        </ColorPickerSwatchGroup>
        <ColorPickerView format="rgba">
          <ColorPickerChannelInput channel="hex" />
          <ColorPickerChannelInput channel="alpha" />
        </ColorPickerView>
        <ColorPickerView format="hsla">
          <ColorPickerChannelInput channel="hue" />
          <ColorPickerChannelInput channel="saturation" />
          <ColorPickerChannelInput channel="lightness" />
        </ColorPickerView>
        <ColorPickerEyeDropperTrigger>Pick color</ColorPickerEyeDropperTrigger>
      </ColorPickerContent>
    </ColorPickerPositioner>
  </ColorPickerRoot>
</template>
