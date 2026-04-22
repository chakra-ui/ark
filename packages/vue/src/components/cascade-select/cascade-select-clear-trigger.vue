<script lang="ts">
import type { ButtonHTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface CascadeSelectClearTriggerBaseProps extends PolymorphicProps {}
export interface CascadeSelectClearTriggerProps
  extends
    CascadeSelectClearTriggerBaseProps,
    /**
     * @vue-ignore
     */
    ButtonHTMLAttributes {}
</script>

<script setup lang="ts">
import { useForwardExpose } from '../../utils/use-forward-expose'
import { ark } from '../factory'
import { useCascadeSelectContext } from './use-cascade-select-context'

defineProps<CascadeSelectClearTriggerProps>()
const cascadeSelect = useCascadeSelectContext()

useForwardExpose()
</script>

<template>
  <ark.button v-bind="cascadeSelect.getClearTriggerProps()" :as-child="asChild">
    <slot />
  </ark.button>
</template>
