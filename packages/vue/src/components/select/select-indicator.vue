<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface SelectIndicatorProps extends PolymorphicProps, /* @vue-ignore */ HTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useSelectContext } from './use-select-context'

defineProps<SelectIndicatorProps>()
const select = useSelectContext()
</script>

<template>
  <ark.div v-bind="select.indicatorProps" :as-child="asChild">
    <slot />
  </ark.div>
</template>
