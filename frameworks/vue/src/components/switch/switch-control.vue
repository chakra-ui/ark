<script lang="ts">
import type { PolymorphicProps } from '../factory'

export interface SwitchControlProps extends PolymorphicProps {}
</script>

<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import { ark } from '../factory'
import { useSwitchContext } from './use-switch-context'

defineProps<SwitchControlProps>()
const attrs = useAttrs()
const context = useSwitchContext()

const controlProps = computed(() => ({
  ...attrs,
  ...context.value.controlProps,
}))
</script>

<template>
  <ark.span v-bind="controlProps" :as-child="asChild">
    <slot />
  </ark.span>
  <input v-bind="context.hiddenInputProps" />
</template>
