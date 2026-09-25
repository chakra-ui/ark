<script lang="ts">
import type { LabelHTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface CascadeSelectLabelBaseProps extends PolymorphicProps {}
export interface CascadeSelectLabelProps
  extends
    CascadeSelectLabelBaseProps,
    /**
     * @vue-ignore
     */
    LabelHTMLAttributes {}
</script>

<script setup lang="ts">
import { useForwardExpose } from '../../utils/use-forward-expose'
import { ark } from '../factory'
import { useCascadeSelectContext } from './use-cascade-select-context'

defineProps<CascadeSelectLabelProps>()
const cascadeSelect = useCascadeSelectContext()

useForwardExpose()
</script>

<template>
  <ark.label v-bind="cascadeSelect.getLabelProps()" :as-child="asChild">
    <slot />
  </ark.label>
</template>
