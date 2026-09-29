<script setup lang="ts">
import { ColorPicker, parseColor } from '@ark-ui/vue/color-picker'
</script>

<template>
  <ColorPicker.Root :default-value="parseColor('rgba(255, 0, 0, 0.5)')">
    <ColorPicker.Swatch value="rgba(255, 0, 0, 0.5)" data-testid="swatch" />
    <ColorPicker.ValueSwatch data-testid="value-swatch" />
  </ColorPicker.Root>
</template>
