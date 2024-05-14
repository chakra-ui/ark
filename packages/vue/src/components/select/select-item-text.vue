<script lang="ts">
import type { PolymorphicProps } from '../factory'

export interface SelectItemTextProps extends PolymorphicProps {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useSelectContext } from './use-select-context'
import { useSelectItemPropsContext } from './use-select-item-props-context'

defineProps<SelectItemTextProps>()
const select = useSelectContext()
const itemProps = useSelectItemPropsContext()
</script>

<template>
  <ark.span v-bind="select.getItemTextProps(itemProps)" :as-child="asChild">
    <slot />
  </ark.span>
</template>
