<script lang="ts">
import type { PolymorphicProps } from '../factory'

export interface ComboboxItemIndicatorProps extends PolymorphicProps {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useComboboxContext } from './use-combobox-context'
import { useComboboxItemPropsContext } from './use-combobox-item-props-context'

defineProps<ComboboxItemIndicatorProps>()
const combobox = useComboboxContext()
const itemProps = useComboboxItemPropsContext()
</script>

<template>
  <ark.div v-bind="combobox.getItemIndicatorProps(itemProps)" :as-child="asChild">
    <slot />
  </ark.div>
</template>
