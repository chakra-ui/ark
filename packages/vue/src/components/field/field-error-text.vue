<script lang="ts">
import type { ErrorTextState, ValidityMatch } from '@zag-js/field'
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory.ts'

export interface FieldErrorTextState extends ErrorTextState {}
export interface FieldErrorTextBaseProps extends PolymorphicProps {
  /**
   * Narrows when the error text shows: a `ValidityState` key shows it only for that native failure,
   * `true` forces it visible, and omitted shows it whenever the field is invalid.
   */
  match?: ValidityMatch | boolean
  /**
   * Overrides the generated id. Use when two error texts share the same `match`.
   */
  id?: string
}
export interface FieldErrorTextProps
  extends
    FieldErrorTextBaseProps,
    /**
     * @vue-ignore
     */
    Omit<HTMLAttributes, 'id'> {}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'
import { type PolymorphicSlots, ark } from '../factory.ts'
import { useFieldContext } from './use-field-context.ts'

const props = withDefaults(defineProps<FieldErrorTextProps>(), { match: undefined })
defineSlots<PolymorphicSlots<FieldErrorTextState>>()

const field = useFieldContext()
const errorTextProps = computed(() => ({ match: props.match, id: props.id }))

useForwardExpose()
</script>

<template>
  <ark.span
    v-bind="field?.getErrorTextProps(errorTextProps)"
    :state="field?.getErrorTextState(errorTextProps)"
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
