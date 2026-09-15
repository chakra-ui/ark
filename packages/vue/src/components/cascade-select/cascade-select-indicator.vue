<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface CascadeSelectIndicatorBaseProps extends PolymorphicProps {}
export interface CascadeSelectIndicatorProps
  extends
    CascadeSelectIndicatorBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { useForwardExpose } from '../../utils/use-forward-expose'
import { ark } from '../factory'
import { useCascadeSelectContext } from './use-cascade-select-context'

defineProps<CascadeSelectIndicatorProps>()
const cascadeSelect = useCascadeSelectContext()

useForwardExpose()
</script>

<template>
  <ark.div v-bind="cascadeSelect.getIndicatorProps()" :as-child="asChild">
    <slot />
  </ark.div>
</template>
