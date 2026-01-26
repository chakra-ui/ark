<script setup lang="ts">
import { ColorPicker, parseColor } from '@ark-ui/vue/color-picker'
import { Check } from 'lucide-vue-next'
import styles from 'styles/color-picker.module.css'

const swatches = ['red', 'pink', 'orange', 'purple']
</script>

<template>
  <ColorPicker.Root :class="styles.Root" inline :default-value="parseColor('#eb5e41')">
    <output>
      Selected color:
      <ColorPicker.ValueText :class="styles.ValueText" />
    </output>
    <ColorPicker.SwatchGroup :class="styles.SwatchGroup">
      <ColorPicker.SwatchTrigger v-for="color in swatches" :key="color" :class="styles.SwatchTrigger" :value="color">
        <ColorPicker.Swatch :class="styles.Swatch" :value="color">
          <ColorPicker.SwatchIndicator :class="styles.SwatchIndicator">
            <Check />
          </ColorPicker.SwatchIndicator>
        </ColorPicker.Swatch>
      </ColorPicker.SwatchTrigger>
    </ColorPicker.SwatchGroup>
  </ColorPicker.Root>
</template>
