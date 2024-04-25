<script lang="ts">
import type { PolymorphicProps } from '../factory'

export interface ComboboxItemTextProps extends PolymorphicProps {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useComboboxContext } from './use-combobox-context'
import { useComboboxItemPropsContext } from './use-combobox-item-props-context'

defineProps<ComboboxItemTextProps>()
const combobox = useComboboxContext()
const itemProps = useComboboxItemPropsContext()
</script>

<template>
  <ark.span v-bind="combobox.getItemTextProps(itemProps)" :as-child="asChild">
    <slot />
  </ark.span>
</template>
