<script lang="ts">
import type { IndicatorState, IndicatorType } from '@zag-js/field'
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory.ts'

export interface FieldIndicatorState extends IndicatorState {}
export interface FieldIndicatorBaseProps extends PolymorphicProps {
  /**
   * The state the indicator reflects. Hidden unless the state matches.
   */
  type: IndicatorType
}
export interface FieldIndicatorProps
  extends
    FieldIndicatorBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'
import { type PolymorphicSlots, ark } from '../factory.ts'
import { useFieldContext } from './use-field-context.ts'

const props = defineProps<FieldIndicatorProps>()
defineSlots<PolymorphicSlots<FieldIndicatorState>>()

const field = useFieldContext()
const indicatorProps = computed(() => ({ type: props.type }))

useForwardExpose()
</script>

<template>
  <ark.span
    v-bind="field?.getIndicatorProps(indicatorProps)"
    :state="field?.getIndicatorState(indicatorProps)"
    :as-child="asChild"
  >
    <template v-if="$slots.render" #render="scope">
      <slot name="render" v-bind="scope" />
    </template>
    <template v-else #default>
      <slot />
    </template>
  </ark.span>
</template>
