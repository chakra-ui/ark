<script lang="ts">
import type { ItemGroupProps } from '@zag-js/select'
import type { PolymorphicProps } from '../factory'

export interface SelectItemGroupProps extends PolymorphicProps, Partial<ItemGroupProps> {}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { useId } from '../../utils'
import { ark } from '../factory'
import { useSelectContext } from './use-select-context'
import { SelectItemGroupPropsProvider } from './use-select-item-group-props-context'

const props = defineProps<SelectItemGroupProps>()
const select = useSelectContext()
const id = useId()
const itemGroupProps = computed(() => ({ id: props.id ? props.id : id.value }))
SelectItemGroupPropsProvider(itemGroupProps.value)
</script>

<template>
  <ark.div v-bind="select.getItemGroupProps(itemGroupProps)" :as-child="asChild">
    <slot />
  </ark.div>
</template>
