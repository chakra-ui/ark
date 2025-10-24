<script setup lang="ts">
import { useMarqueeContext } from './use-marquee-context'

const api = useMarqueeContext()
</script>

<template>
  <slot v-bind="api" />
</template>
