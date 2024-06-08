<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface ComboboxListProps
  extends PolymorphicProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useComboboxContext } from './use-combobox-context'

defineProps<ComboboxListProps>()
const combobox = useComboboxContext()
</script>

<template>
  <ark.div v-bind="combobox.getListProps()" :as-child="asChild">
    <slot />
  </ark.div>
</template>
