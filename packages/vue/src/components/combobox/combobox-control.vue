<script lang="ts">
import type { PolymorphicProps } from '../factory'

export interface ComboboxControlProps extends PolymorphicProps {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useComboboxContext } from './use-combobox-context'

defineProps<ComboboxControlProps>()
const combobox = useComboboxContext()
</script>

<template>
  <ark.div v-bind="combobox.controlProps" :as-child="asChild">
    <slot />
  </ark.div>
</template>
