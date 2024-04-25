<script lang="ts">
import type { PolymorphicProps } from '../factory'

export interface ComboboxLabelProps extends PolymorphicProps {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useComboboxContext } from './use-combobox-context'

defineProps<ComboboxLabelProps>()
const combobox = useComboboxContext()
</script>

<template>
  <ark.label v-bind="combobox.labelProps" :as-child="asChild">
    <slot />
  </ark.label>
</template>
