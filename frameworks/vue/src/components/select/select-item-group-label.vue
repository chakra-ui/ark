<script lang="ts">
import type { PolymorphicProps } from '../factory'

export interface SelectItemGroupLabelProps extends PolymorphicProps {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useSelectContext } from './use-select-context'
import { useSelectItemGroupPropsContext } from './use-select-item-group-props-context'

defineProps<SelectItemGroupLabelProps>()
const select = useSelectContext()
const itemGroupProps = useSelectItemGroupPropsContext()
</script>

<template>
  <ark.div
    v-bind="select.getItemGroupLabelProps({ htmlFor: itemGroupProps.id })"
    :as-child="asChild"
  >
    <slot />
  </ark.div>
</template>
