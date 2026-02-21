<script lang="ts">
import type { ItemProps } from '@zag-js/cascade-select'
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface CascadeSelectListBaseProps extends ItemProps, PolymorphicProps {}
export interface CascadeSelectListProps
  extends
    CascadeSelectListBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { useForwardExpose } from '../../utils/use-forward-expose'
import { ark } from '../factory'
import { useCascadeSelectContext } from './use-cascade-select-context'

const props = defineProps<CascadeSelectListProps>()
const cascadeSelect = useCascadeSelectContext()
const itemProps = computed(() => ({ item: props.item, indexPath: props.indexPath, value: props.value }))

useForwardExpose()
</script>

<template>
  <ark.div v-bind="cascadeSelect.getListProps(itemProps)" :as-child="asChild">
    <slot />
  </ark.div>
</template>
