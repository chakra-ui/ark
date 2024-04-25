<script lang="ts">
import type { PolymorphicProps } from '../factory'

export interface ComboboxInputProps extends PolymorphicProps {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useComboboxContext } from './use-combobox-context'

defineProps<ComboboxInputProps>()
const combobox = useComboboxContext()

</script>

<template>
  <ark.input v-bind="combobox.inputProps" :as-child="asChild" />
</template>
