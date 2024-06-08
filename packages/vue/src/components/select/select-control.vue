<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface SelectControlProps
  extends PolymorphicProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useSelectContext } from './use-select-context'

defineProps<SelectControlProps>()
const select = useSelectContext()
</script>

<template>
  <ark.div v-bind="select.getControlProps()" :as-child="asChild">
    <slot />
  </ark.div>
</template>
