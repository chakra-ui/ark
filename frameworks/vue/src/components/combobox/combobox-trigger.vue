<script lang="ts">
import type { PolymorphicProps } from '../factory'

export interface ComboboxTriggerProps extends PolymorphicProps {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useComboboxContext } from './use-combobox-context'

defineProps<ComboboxTriggerProps>()
const combobox = useComboboxContext()
</script>

<template>
  <ark.button v-bind="combobox.triggerProps" :as-child="asChild">
    <slot />
  </ark.button>
</template>
