<script lang="ts">
import type { PolymorphicProps } from '../factory'

export interface SelectControlProps extends PolymorphicProps {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useSelectContext } from './use-select-context'
import { computed, useAttrs } from 'vue'

defineProps<SelectControlProps>()
const attrs = useAttrs()
const select = useSelectContext()

const controlProps = computed(() => ({
  ...attrs,
  ...select.value.controlProps,
}))
</script>

<template>
  <ark.div v-bind="controlProps" :as-child="asChild">
    <slot />
  </ark.div>
  <select v-bind="select.hiddenSelectProps">
    <option v-if="select.value.length === 0" value="" />
    <option v-for="option in select.collection.toArray()" :key="option.value" :value="option.value">
      {{ option.label }}
    </option>
  </select>
</template>
