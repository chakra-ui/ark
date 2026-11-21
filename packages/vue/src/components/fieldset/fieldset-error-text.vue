<script lang="ts">
import type { RootState } from '@zag-js/fieldset'
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory.ts'

export interface FieldsetErrorTextState extends RootState {}
export interface FieldsetErrorTextBaseProps extends PolymorphicProps {}
export interface FieldsetErrorTextProps
  extends
    FieldsetErrorTextBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { type PolymorphicSlots, ark } from '../factory.ts'
import { useFieldsetContext } from './use-fieldset-context.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

defineProps<FieldsetErrorTextProps>()
defineSlots<PolymorphicSlots<FieldsetErrorTextState>>()
const fieldset = useFieldsetContext()

useForwardExpose()
</script>

<template>
  <ark.span v-bind="fieldset.getErrorTextProps()" :state="fieldset.getRootState()" :as-child="asChild">
    <template v-if="$slots.render" #render="scope">
      <slot name="render" v-bind="scope" />
    </template>
    <template v-else #default>
      <slot />
    </template>
  </ark.span>
</template>
