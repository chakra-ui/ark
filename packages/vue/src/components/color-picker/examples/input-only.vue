<script setup lang="ts">
import { ColorPicker, parseColor } from '@ark-ui/vue/color-picker'
import { Pipette } from 'lucide-vue-next'
import styles from 'styles/color-picker.module.css'
</script>

<template>
  <ColorPicker.Root :class="styles.Root" :default-value="parseColor('#eb5e41')">
    <ColorPicker.Label :class="styles.Label">Color</ColorPicker.Label>
    <ColorPicker.Control :class="styles.Control">
      <ColorPicker.ValueSwatch :class="styles.Swatch" />
      <ColorPicker.ChannelInput :class="styles.Input" channel="hex" />
      <ColorPicker.EyeDropperTrigger :class="styles.EyeDropperTrigger">
        <Pipette />
      </ColorPicker.EyeDropperTrigger>
    </ColorPicker.Control>
    <ColorPicker.HiddenInput />
  </ColorPicker.Root>
</template>
