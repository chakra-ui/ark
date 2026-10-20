<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface CascadeSelectItemIndicatorBaseProps extends PolymorphicProps {}
export interface CascadeSelectItemIndicatorProps
  extends
    CascadeSelectItemIndicatorBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { useForwardExpose } from '../../utils/use-forward-expose'
import { ark } from '../factory'
import { useCascadeSelectContext } from './use-cascade-select-context'
import { useCascadeSelectItemPropsContext } from './use-cascade-select-item-props-context'

defineProps<CascadeSelectItemIndicatorProps>()
const cascadeSelect = useCascadeSelectContext()
const itemProps = useCascadeSelectItemPropsContext()

useForwardExpose()
</script>

<template>
  <ark.div v-bind="cascadeSelect.getItemIndicatorProps(itemProps)" :as-child="asChild">
    <slot />
  </ark.div>
</template>
