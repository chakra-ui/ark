<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface CascadeSelectControlBaseProps extends PolymorphicProps {}
export interface CascadeSelectControlProps
  extends
    CascadeSelectControlBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { useForwardExpose } from '../../utils/use-forward-expose'
import { ark } from '../factory'
import { useCascadeSelectContext } from './use-cascade-select-context'

defineProps<CascadeSelectControlProps>()
const cascadeSelect = useCascadeSelectContext()

useForwardExpose()
</script>

<template>
  <ark.div v-bind="cascadeSelect.getControlProps()" :as-child="asChild">
    <slot />
  </ark.div>
</template>
