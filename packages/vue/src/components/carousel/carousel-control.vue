<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface CarouselControlProps extends PolymorphicProps, /* @vue-ignore */ HTMLAttributes {}
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
