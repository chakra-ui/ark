<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface FieldErrorTextBaseProps extends PolymorphicProps {}
export interface FieldErrorTextProps
  extends FieldErrorTextBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useFieldContext } from './use-field-context'

defineProps<FieldErrorTextProps>()
const field = useFieldContext()
</script>

<template>
  <ark.span v-if="field.invalid" v-bind="field.getErrorTextProps()" :as-child="asChild">
    <slot />
  </ark.span>
</template>
