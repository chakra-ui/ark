<script lang="ts">
import type { PolymorphicProps } from '../factory'

export interface ComboboxContentProps extends PolymorphicProps {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useComboboxContext } from './use-combobox-context'

defineProps<ComboboxContentProps>()
const combobox = useComboboxContext()
</script>

<template>
  <ark.div v-bind="combobox.contentProps" :as-child="asChild">
    <slot />
  </ark.div>
</template>
