<script setup lang="ts">
import type { UnwrapRef } from 'vue'
import { type UseCollapsibleContext, useCollapsibleContext } from './use-collapsible-context'

const collapsible = useCollapsibleContext()

defineSlots<{
  default(props: {
    collapsible: UnwrapRef<UseCollapsibleContext>
  }): any
}>()
</script>

<template>
  <slot :collapsible />
</template>