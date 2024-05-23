<script lang="ts">
import type { ButtonHTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface CollapsibleTriggerProps
  extends PolymorphicProps,
    /* @vue-ignore */ ButtonHTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useCollapsibleContext } from './use-collapsible-context'

defineProps<CollapsibleTriggerProps>()
const collapsible = useCollapsibleContext()
</script>

<template>
  <ark.button v-bind="collapsible.triggerProps">
    <slot />
  </ark.button>
</template>
