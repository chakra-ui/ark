<script lang="ts">
import type { PolimoprhicProps } from '../factory'

export interface CarouselControlProps extends PolimoprhicProps {}
</script>

<script setup lang="ts">
import { carouselAnatomy } from '@ark-ui/anatomy'
import { ark } from '../factory'

defineProps<CarouselControlProps>()
</script>

<template>
  <ark.div v-bind="{ ...carouselAnatomy.build().control.attrs }" :as-child="asChild">
    <slot />
  </ark.div>
</template>
