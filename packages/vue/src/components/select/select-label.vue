<script lang="ts">
import type { LabelHTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface SelectLabelProps
  extends PolymorphicProps,
    /**
     * @vue-ignore
     */
    LabelHTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useSelectContext } from './use-select-context'

defineProps<SelectLabelProps>()
const select = useSelectContext()
</script>

<template>
  <ark.label v-bind="select.getLabelProps()" :as-child="asChild">
    <slot />
  </ark.label>
</template>
