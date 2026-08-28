<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory.ts'

export interface FieldsetLegendBaseProps extends PolymorphicProps {}
export interface FieldsetLegendProps
  extends
    FieldsetLegendBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory.ts'
import { useFieldsetContext } from './use-fieldset-context.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

defineProps<FieldsetLegendProps>()
const fieldset = useFieldsetContext()

useForwardExpose()
</script>

<template>
  <ark.legend v-bind="fieldset.getLegendProps()" :as-child="asChild"><slot /></ark.legend>
</template>
