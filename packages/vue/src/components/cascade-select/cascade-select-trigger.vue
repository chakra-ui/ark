<script lang="ts">
import type { ButtonHTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface CascadeSelectTriggerBaseProps extends PolymorphicProps {}
export interface CascadeSelectTriggerProps
  extends
    CascadeSelectTriggerBaseProps,
    /**
     * @vue-ignore
     */
    ButtonHTMLAttributes {}
</script>

<script setup lang="ts">
import { useForwardExpose } from '../../utils/use-forward-expose'
import { ark } from '../factory'
import { useCascadeSelectContext } from './use-cascade-select-context'

defineProps<CascadeSelectTriggerProps>()
const cascadeSelect = useCascadeSelectContext()

useForwardExpose()
</script>

<template>
  <ark.button v-bind="cascadeSelect.getTriggerProps()" :as-child="asChild">
    <slot />
  </ark.button>
</template>
