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
  <ark.legend v-bind="fieldset.getLegendProps()" :as-child="asChild">
    <template v-if="$slots.render" #render="scope">
      <slot name="render" v-bind="scope" />
    </template>
    <template v-else #default>
      <slot />
    </template>
  </ark.legend>
</template>
