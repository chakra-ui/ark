<script lang="ts">
import type { PolymorphicProps } from '../factory'

export interface SelectTriggerProps extends PolymorphicProps {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useSelectContext } from './use-select-context'

defineProps<SelectTriggerProps>()
const select = useSelectContext()
</script>

<template>
  <ark.button v-bind="select.triggerProps" :as-child="asChild">
    <slot />
  </ark.button>
</template>
