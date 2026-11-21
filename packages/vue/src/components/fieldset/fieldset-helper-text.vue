<script lang="ts">
import type { RootState } from '@zag-js/fieldset'
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory.ts'

export interface FieldsetHelperTextState extends RootState {}
export interface FieldsetHelperTextBaseProps extends PolymorphicProps {}
export interface FieldsetHelperTextProps
  extends
    FieldsetHelperTextBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { type PolymorphicSlots, ark } from '../factory.ts'
import { useFieldsetContext } from './use-fieldset-context.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

defineProps<FieldsetHelperTextProps>()
defineSlots<PolymorphicSlots<FieldsetHelperTextState>>()
const fieldset = useFieldsetContext()

useForwardExpose()
</script>

<template>
  <ark.span v-bind="fieldset.getHelperTextProps()" :state="fieldset.getRootState()" :as-child="asChild">
    <template v-if="$slots.render" #render="scope">
      <slot name="render" v-bind="scope" />
    </template>
    <template v-else #default>
      <slot />
    </template>
  </ark.span>
</template>
