<script lang="ts">
import type { RootState } from '@zag-js/field'
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory.ts'

export interface FieldHelperTextState extends RootState {}
export interface FieldHelperTextBaseProps extends PolymorphicProps {}
export interface FieldHelperTextProps
  extends
    FieldHelperTextBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { useForwardExpose } from '../../utils/use-forward-expose.ts'
import { type PolymorphicSlots, ark } from '../factory.ts'
import { useFieldContext } from './use-field-context.ts'

defineProps<FieldHelperTextProps>()
defineSlots<PolymorphicSlots<FieldHelperTextState>>()

const field = useFieldContext()

useForwardExpose()
</script>

<template>
  <ark.span v-bind="field?.getHelperTextProps()" :state="field?.getRootState()" :as-child="asChild">
    <template v-if="$slots.render" #render="scope">
      <slot name="render" v-bind="scope" />
    </template>
    <template v-else #default>
      <slot />
    </template>
  </ark.span>
</template>
