<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface FieldsetLegendBaseProps extends PolymorphicProps {}
export interface FieldsetLegendProps
  extends FieldsetLegendBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useFieldsetContext } from './use-fieldset-context'
import { useForwardExpose } from '../../utils'

defineProps<FieldsetLegendProps>()
const fieldset = useFieldsetContext()

useForwardExpose()
</script>

<template>
  <ark.legend v-bind="fieldset.getLegendProps()" :as-child="asChild"><slot /></ark.legend>
</template>
