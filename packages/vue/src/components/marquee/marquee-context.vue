<script lang="ts">
import type { UseMarqueeContext } from './use-marquee-context'

export interface MarqueeContextProps {
  children: (context: UseMarqueeContext) => any
}
</script>

<script setup lang="ts">
import { useMarqueeContext } from './use-marquee-context'

const api = useMarqueeContext()
</script>

<template>
  <slot v-bind="api" />
</template>
