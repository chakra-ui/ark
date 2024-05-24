<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface ColorPickerSwatchGroupProps
  extends PolymorphicProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { colorPickerAnatomy } from '@ark-ui/anatomy'
import { ark } from '../factory'

defineProps<ColorPickerSwatchGroupProps>()
</script>

<template>
  <ark.div v-bind="colorPickerAnatomy.build().swatchGroup.attrs" :as-child="asChild">
    <slot />
  </ark.div>
</template>
