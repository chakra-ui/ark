<script lang="ts">
import type { ItemGroupProps } from '@zag-js/select'
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface SelectItemGroupProps
  extends PolymorphicProps,
    Partial<ItemGroupProps>,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { useId } from '../../utils'
import { ark } from '../factory'
import { useSelectContext } from './use-select-context'
import { SelectItemGroupPropsProvider } from './use-select-item-group-props-context'

const props = defineProps<SelectItemGroupProps>()
const select = useSelectContext()
const id = useId(props.id)

SelectItemGroupPropsProvider({id})
</script>

<template>
  <ark.div v-bind="select.getItemGroupProps({id})" :as-child="asChild">
    <slot />
  </ark.div>
</template>
