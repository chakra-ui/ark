<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'
import type { PresenceProps } from '../presence'

export interface ColorPickerContentProps
  extends PresenceProps,
    PolymorphicProps,
    /* @vue-ignore */ HTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useColorPickerContext } from './use-color-picker-context'

defineProps<ColorPickerContentProps>()
const colorPicker = useColorPickerContext()
</script>

<template>
  <ark.div v-bind="colorPicker.contentProps">
    <slot />
  </ark.div>
</template>
